import type { CtaLink } from "@/types/content";

/**
 * Single typed source of truth for factual business information and external
 * integration destinations. Components must read destinations from here — never
 * hardcode or guess a URL elsewhere. If a value becomes unconfirmed, revert it to
 * `null` and the consuming component falls back to an approved neutral state.
 *
 * Sources: approved project metadata; user-confirmed integration URLs (see
 * docs/decisions/source-conflicts.md #1).
 */

export interface SiteConfig {
  name: string;
  legalName: string;
  category: string;
  brandIdea: string;
  brandPromise: string;
  endline: string;
  /** Production origin (approved metadata governs .co over the Charter's .com). */
  url: string;
  inquiryEmail: string;
  inquiryResponseTime: string;
  /** External destinations. `null` => not confirmed => component uses a neutral fallback. */
  social: {
    substack: string | null;
    substackPublicationName: string;
    luma: string | null;
    instagram: string | null;
    linkedin: string | null;
  };
}

export const site: SiteConfig = {
  name: "Reigate Travel & Co.",
  legalName: "Reigate Travel & Co.",
  category: "Lifestyle Wellness Travel",
  brandIdea: "Travel is part of living well.",
  brandPromise:
    "We help people invest in living well through meaningful travel, thoughtful service, and genuine community.",
  endline: "Experiences That Stay With You.",
  url: "https://www.reigatetravel.co",
  inquiryEmail: "concierge@reigatetravel.co",
  inquiryResponseTime: "24–48 hours",
  social: {
    // Unconfirmed: tylertakesoff.substack.com returns 404 (verified 2026-07-27). Per the
    // content-safety rule an unverified destination is disabled rather than linked, so
    // consumers fall back to their neutral state. Restore the URL once the publication is
    // live. See docs/decisions/missing-inputs.md #9 and source-conflicts.md #1.
    substack: null,
    substackPublicationName: "Tyler Takes Off",
    luma: "https://luma.com/reigatetravelco",
    instagram: "https://www.instagram.com/reigatetravel.co/",
    linkedin: "https://ca.linkedin.com/in/tyler-reigate-13b3aa2b2",
  },
};

/**
 * Where "Join the Community" goes, for every call site on the site.
 *
 * This exists because the same label meant three different things: Luma on the homepage
 * community band, the newsletter band (`#join`) in the final CTA, and a jump back to the
 * homepage from /community and /curated-journeys — the last of which sent a visitor
 * *away* from the page they were reading about community.
 *
 * The newsletter anchor is deliberately NOT the fallback. Travel Notes is the content
 * relationship and the Reigate community is the events relationship; collapsing the two is
 * what made the CTA incoherent in the first place. With Luma unconfirmed this points at the
 * Community page, which always exists and always tells the truth.
 */
export const communityCta: CtaLink = {
  label: "Join the Community",
  href: site.social.luma ?? "/community",
  external: Boolean(site.social.luma),
  // Announced here rather than at each call site, so no consumer can render the outbound
  // version without telling a screen-reader user where it goes and that it opens a new tab.
  accessibleLabel: site.social.luma ? "Join the Community on Luma (opens in a new tab)" : undefined,
};

/** Approved credentials — use these exact strings. Do not expand "WTA" or add numbers/logos. */
export const credentials: readonly string[] = [
  "Certified TICO Travel Advisor",
  "FORA Travel Advisor",
  "WTA Member",
];
