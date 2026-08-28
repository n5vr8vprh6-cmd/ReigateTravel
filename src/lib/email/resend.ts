import { resendApiKey } from "@/lib/email/config";

/**
 * Resend's REST API, called directly.
 *
 * No SDK. The endpoint is one authenticated JSON POST, and the SDK would be a fifth
 * dependency in a project whose four dependencies total 102KB and which has already rejected
 * a dependency on weight grounds (decision-log #26). What we take on instead is parsing the
 * response shape ourselves, which the unit tests cover.
 */

const ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

export interface SendEmailInput {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  /** De-duplicates retries and double submits inside Resend's 24-hour window. */
  idempotencyKey?: string;
}

export type SendResult =
  { ok: true; id: string | null } | { ok: false; status: number | null; error: string };

export async function sendEmail(input: SendEmailInput): Promise<SendResult> {
  if (!resendApiKey) {
    return { ok: false, status: null, error: "RESEND_API_KEY is not set" };
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${resendApiKey}`,
    "Content-Type": "application/json",
  };
  if (input.idempotencyKey) headers["Idempotency-Key"] = input.idempotencyKey;

  const body = JSON.stringify({
    from: input.from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    ...(input.replyTo ? { reply_to: input.replyTo } : {}),
  });

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      // Read the body for the message, but never let a parse failure mask the status.
      let detail = "";
      try {
        const parsed: unknown = await response.json();
        if (parsed && typeof parsed === "object" && "message" in parsed) {
          detail = String((parsed as { message: unknown }).message);
        }
      } catch {
        detail = await response.text().catch(() => "");
      }
      return { ok: false, status: response.status, error: detail || response.statusText };
    }

    const parsed: unknown = await response.json().catch(() => null);
    const id =
      parsed && typeof parsed === "object" && "id" in parsed
        ? String((parsed as { id: unknown }).id)
        : null;
    return { ok: true, id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown transport error";
    return { ok: false, status: null, error: message };
  }
}
