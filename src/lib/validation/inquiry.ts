import { inquirySteps, enrichmentSteps, inquiryConsent } from "@/content/inquiry";
import type { InquiryStep } from "@/types/content";
import type { InquiryField } from "@/types/content";

export type FieldErrors = Record<string, string>;

export interface ValidationResult {
  ok: boolean;
  fieldErrors: FieldErrors;
}

/**
 * Deliberately permissive — the HTML5 `input[type=email]` shape, not an RFC 5322 attempt.
 * A clever regex here rejects real addresses; the only thing that truly validates an address
 * is sending to it, and a wrong address costs the visitor a reply either way.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** At least a few digits, allowing the punctuation people actually type. */
const TEL = /^[+()\-.\s\d]{6,}$/;

const fieldsOf = (steps: readonly InquiryStep[]): readonly InquiryField[] =>
  steps.flatMap((step) => step.fields);

function validateField(field: InquiryField, raw: string | undefined): string | null {
  const value = (raw ?? "").trim();

  if (!value) {
    if (field.required) {
      return field.requiredMessage ?? `${field.label} is required.`;
    }
    // Optional and empty: nothing further to check. Checking format on an empty optional
    // field is the classic way to make a form impossible to submit.
    return null;
  }

  if (field.maxLength && value.length > field.maxLength) {
    return `Please keep this under ${field.maxLength} characters.`;
  }

  if (field.kind === "email" && !EMAIL.test(value)) {
    return "Please check this email address.";
  }

  if (field.kind === "tel" && !TEL.test(value)) {
    return "Please check this phone number.";
  }

  if ((field.kind === "select" || field.kind === "radio") && field.options) {
    const allowed = field.options.map((option) => option.value);
    if (!allowed.includes(value)) {
      // Not a user-facing case in a working browser — this catches a tampered payload.
      return "Please choose one of the listed options.";
    }
  }

  return null;
}

/**
 * Server-side validation against a given step registry. The client validates too, but only for
 * the sake of the person filling the form in — this is the copy that decides whether an email
 * is sent.
 *
 * Parameterised by registry so the pre-call enrichment form cannot drift into a second set of
 * rules. One validator, two forms; the only difference between them is whether consent applies,
 * and enrichment does not take consent because the inquiry it follows already did.
 */
export function validateAgainst(
  steps: readonly InquiryStep[],
  values: Record<string, string>,
  { requireConsent }: { requireConsent: boolean }
): ValidationResult {
  const fieldErrors: FieldErrors = {};

  for (const field of fieldsOf(steps)) {
    const error = validateField(field, values[field.name]);
    if (error) fieldErrors[field.name] = error;
  }

  // Consent is not in the step registry: it is a condition of submitting, not a question.
  if (requireConsent && values[inquiryConsent.name] !== "on") {
    fieldErrors[inquiryConsent.name] = inquiryConsent.requiredMessage;
  }

  return { ok: Object.keys(fieldErrors).length === 0, fieldErrors };
}

export function validateInquiry(values: Record<string, string>): ValidationResult {
  return validateAgainst(inquirySteps, values, { requireConsent: true });
}

export function validateEnrichment(values: Record<string, string>): ValidationResult {
  return validateAgainst(enrichmentSteps, values, { requireConsent: false });
}

/** The step a given field lives in, so a failed submit can jump the visitor to it. */
export function stepIndexOfField(
  name: string,
  steps: readonly InquiryStep[] = inquirySteps
): number {
  const index = steps.findIndex((step) => step.fields.some((f) => f.name === name));
  // Consent renders on the final step alongside the submit button.
  return index === -1 ? steps.length - 1 : index;
}
