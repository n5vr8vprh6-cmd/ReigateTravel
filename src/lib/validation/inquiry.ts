import { inquirySteps, inquiryConsent } from "@/content/inquiry";
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

const allFields: readonly InquiryField[] = inquirySteps.flatMap((step) => step.fields);

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
 * Server-side validation. The client validates too, but only for the sake of the person
 * filling the form in — this is the copy that decides whether an email is sent.
 */
export function validateInquiry(values: Record<string, string>): ValidationResult {
  const fieldErrors: FieldErrors = {};

  for (const field of allFields) {
    const error = validateField(field, values[field.name]);
    if (error) fieldErrors[field.name] = error;
  }

  // Consent is not in the step registry: it is a condition of submitting, not a question.
  if (values[inquiryConsent.name] !== "on") {
    fieldErrors[inquiryConsent.name] = inquiryConsent.requiredMessage;
  }

  return { ok: Object.keys(fieldErrors).length === 0, fieldErrors };
}

/** The step a given field lives in, so a failed submit can jump the visitor to it. */
export function stepIndexOfField(name: string): number {
  const index = inquirySteps.findIndex((step) => step.fields.some((f) => f.name === name));
  // Consent renders on the final step alongside the submit button.
  return index === -1 ? inquirySteps.length - 1 : index;
}
