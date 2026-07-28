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
