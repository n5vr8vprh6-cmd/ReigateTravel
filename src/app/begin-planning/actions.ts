"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseInquiry } from "@/lib/forms/parse";
import { honeypotTripped, submittedTooFast } from "@/lib/forms/spam";
import { checkRateLimit, hashClient } from "@/lib/forms/rate-limit";
import { validateInquiry } from "@/lib/validation/inquiry";
import type { InquiryState } from "@/lib/forms/inquiry-state";
import { buildAcknowledgement, buildNotification } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/resend";
import { inquiryFromEmail, inquiryToEmail } from "@/lib/email/config";
import { site } from "@/content/site";

/**
 * A 10-minute bucket. A double-click or an internal retry inside that window is de-duplicated
 * by Resend; a genuine second inquiry an hour later still sends.
 */
function idempotencyKey(values: Record<string, string>): string {
  const bucket = Math.floor(Date.now() / 600_000);
  return createHash("sha256")
    .update(JSON.stringify(values))
    .update(String(bucket))
    .digest("hex")
    .slice(0, 40);
}

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const values = parseInquiry(formData);

  // A tripped honeypot gets the success path and no email. Telling a bot it was detected only
  // teaches whoever wrote it which field to leave alone next time.
  if (honeypotTripped(formData)) {
    redirect("/begin-planning/received");
  }

  // Its own status, not "invalid". "invalid" with no fieldErrors renders nothing at all —
  // the visitor clicks Send and the page simply sits there. Found by submitting the live
  // form faster than a person would and watching nothing happen.
  if (submittedTooFast(formData)) {
    return { status: "too_fast", fieldErrors: {}, values };
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const clientIp = forwardedFor ? (forwardedFor.split(",")[0]?.trim() ?? null) : null;

  const limit = checkRateLimit(hashClient(clientIp));
  if (!limit.allowed) {
    return { status: "rate_limited", fieldErrors: {}, values };
  }

  const { ok, fieldErrors } = validateInquiry(values);
  if (!ok) {
    return { status: "invalid", fieldErrors, values };
  }

  const notification = buildNotification(values);
  const sent = await sendEmail({
    from: inquiryFromEmail,
    to: inquiryToEmail,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    // So Tyler replies from his own inbox straight to the visitor, per Charter §13.
    replyTo: values.email,
    idempotencyKey: idempotencyKey(values),
  });

  if (!sent.ok) {
    console.error("[inquiry] notification failed", sent.status, sent.error);
    return { status: "delivery_failed", fieldErrors: {}, values };
  }

  // The acknowledgement is best-effort on purpose. The business outcome — Tyler has the
  // inquiry — is already achieved, so a failure here must not tell the visitor their
  // submission failed and send them round again. Logged, not surfaced.
  const acknowledgement = buildAcknowledgement(values);
  const acked = await sendEmail({
    from: inquiryFromEmail,
    to: values.email,
    subject: acknowledgement.subject,
    html: acknowledgement.html,
    text: acknowledgement.text,
    replyTo: site.inquiryEmail,
  });
  if (!acked.ok) {
    console.error("[inquiry] acknowledgement failed", acked.status, acked.error);
  }

  redirect("/begin-planning/received");
}
