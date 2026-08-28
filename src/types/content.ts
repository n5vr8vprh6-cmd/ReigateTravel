/** Shared content types for typed local content objects (no CMS in Version 1). */

export type OfferStatus = "available" | "in-development";

export interface CtaLink {
  label: string;
  href: string;
  /** Screen-reader-friendly full description when the visible label is terse. */
  accessibleLabel?: string;
  external?: boolean;
}

export interface Offer {
  id: string;
  name: string;
  status: OfferStatus;
  /** One approved descriptor sentence. */
  description: string;
  href: string;
  linkLabel: string;
  image?: {
    src: string;
    alt: string;
  };
  /** Primary offer gets emphasized layout; secondary offers are visually quieter. */
  emphasis: "primary" | "secondary";
}

export interface MethodStage {
  index: number;
  name: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Article {
  title: string;
  summary: string;
  date: string; // ISO 8601
  topic: string;
  url: string;
}

/** The kinds of control the guided inquiry renders. Deliberately small. */
export type InquiryFieldKind = "text" | "email" | "tel" | "textarea" | "select" | "radio";

export interface InquiryOption {
  value: string;
  label: string;
}

export interface InquiryField {
  name: string;
  label: string;
  kind: InquiryFieldKind;
  required?: boolean;
  /** Help text rendered under the label and wired via aria-describedby. */
  help?: string;
  /** Format hint only. Never a substitute for the visible label. */
  placeholder?: string;
  /** HTML autocomplete token, where a standard one applies. */
  autoComplete?: string;
  maxLength?: number;
  /** Required for select and radio; the only accepted values. */
  options?: readonly InquiryOption[];
  /** Shown when a required field is empty, in brand voice rather than browser default. */
  requiredMessage?: string;
}

export interface InquiryStep {
  id: string;
  /** Short name used in the progress indicator. */
  name: string;
  heading: string;
  lead?: string;
  fields: readonly InquiryField[];
}
