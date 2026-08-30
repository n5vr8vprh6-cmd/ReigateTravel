import { inquiryFieldNames, enrichmentFieldNames, inquiryConsent } from "@/content/inquiry";

/** Field names the server will read. Everything else in the payload is discarded. */
const ACCEPTED = new Set<string>([...inquiryFieldNames, inquiryConsent.name]);
const ACCEPTED_ENRICHMENT = new Set<string>(enrichmentFieldNames);

/**
 * `FormData` to a plain record, driven by the field registry rather than by whatever the
 * request happened to contain. An allowlist rather than a denylist: a payload with extra keys
 * loses them here instead of carrying them into an email body.
 *
 * Values are trimmed and length-capped defensively. Validation enforces the real per-field
 * limits; this cap only stops a multi-megabyte string reaching the validator at all.
 */
const HARD_CAP = 5000;

function parseWith(formData: FormData, accepted: Set<string>): Record<string, string> {
  const values: Record<string, string> = {};

  for (const name of accepted) {
    const raw = formData.get(name);
    if (typeof raw !== "string") continue;
    values[name] = raw.trim().slice(0, HARD_CAP);
  }

  return values;
}

export function parseInquiry(formData: FormData): Record<string, string> {
  return parseWith(formData, ACCEPTED);
}

/** Same allowlist discipline for the pre-call enrichment form, against its own registry. */
export function parseEnrichment(formData: FormData): Record<string, string> {
  return parseWith(formData, ACCEPTED_ENRICHMENT);
}
