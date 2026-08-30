"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseEnrichment } from "@/lib/forms/parse";
import { honeypotTripped, submittedTooFast } from "@/lib/forms/spam";
import { checkRateLimit, hashClient } from "@/lib/forms/rate-limit";
import { validateEnrichment } from "@/lib/validation/inquiry";
import type { InquiryState } from "@/lib/forms/inquiry-state";
import { buildEnrichment } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/resend";
import { inquiryFromEmail, inquiryToEmail } from "@/lib/email/config";

/** Same 10-minute bucket as the inquiry: a double-click is de-duplicated, a real resend is not. */
function idempotencyKey(values: Record<string, string>): string {
  const bucket = Math.floor(Date.now() / 600_000);
  return createHash("sha256")
    .update("enrichment")
    .update(JSON.stringify(values))
    .update(String(bucket))
    .digest("hex")
    .slice(0, 40);
}

/**
 * Pre-call enrichment delivery.
 *
 * Deliberately the same shape as `submitInquiry`, including the parts that look like overkill
 * for a lower-stakes form: the honeypot, the timing gate and the rate limiter all apply, because
 * this endpoint sends mail and any endpoint that sends mail is worth the same protection.
 *
 * There is no acknowledgement email. The visitor has already had one for the inquiry, and a
 * second "thank you" for optional notes is noise. As with the inquiry, a failed send is never
 * reported as a success.
 */
export async function submitEnrichment(
  _previous: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const values = parseEnrichment(formData);

  if (honeypotTripped(formData)) {
    redirect("/begin-planning/prepare/received");
  }

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

  const { ok, fieldErrors } = validateEnrichment(values);
  if (!ok) {
    return { status: "invalid", fieldErrors, values };
  }

  const enrichment = buildEnrichment(values);
  const sent = await sendEmail({
    from: inquiryFromEmail,
    to: inquiryToEmail,
    subject: enrichment.subject,
    html: enrichment.html,
    text: enrichment.text,
    // So Tyler can reply straight to the visitor from the notes themselves.
    replyTo: values.email,
    idempotencyKey: idempotencyKey(values),
  });

  if (!sent.ok) {
    console.error("[enrichment] notification failed", sent.status, sent.error);
    return { status: "delivery_failed", fieldErrors: {}, values };
  }

  redirect("/begin-planning/prepare/received");
}
