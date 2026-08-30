import type { NavItem } from "@/types/content";

/**
 * Primary navigation.
 *
 * Charter §8's sitemap lists Community alongside Travel Planning, Travel Notes and About, and
 * that is how this shipped. It gave a page describing an offer that is still in development the
 * same standing as the one service anyone can actually buy — four apparently equal branches, one
 * of which is the business. Community moves to the footer beside Curated Wellness Journeys, the
 * other in-development offer, which is where the ecosystem belongs while it is still forming.
 *
 * Both pages remain reachable, in the sitemap, and linked from the homepage's own community
 * band. Nothing is hidden; the hierarchy just stops claiming they are equals.
 *
 * Recorded in docs/decisions/source-conflicts.md #10. To reverse, move the entry back.
 */
export const primaryNav: NavItem[] = [
  { label: "Travel Planning", href: "/travel-planning" },
  { label: "Travel Notes", href: "/travel-notes" },
  { label: "About", href: "/about" },
];

/** Footer utility navigation — Charter §8. Legal routes live in `legalNav` below. */
export const footerNav: NavItem[] = [
  { label: "Community Experiences", href: "/community" },
  { label: "Curated Wellness Journeys", href: "/curated-journeys" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Frequently Asked Questions", href: "/faq" },
];

/**
 * Routes that belong with the ways of getting in touch rather than in the Explore list.
 * Separate from `footerNav` so the Connect column owns them, and spread into the sitemap
 * alongside the others.
 */
export const connectNav: NavItem[] = [{ label: "Contact", href: "/contact" }];

/**
 * Legal and compliance routes. Split out of `footerNav` so they can sit on the copyright
 * row, which is where visitors expect them.
 *
 * Anything added here must also be spread into `src/app/sitemap.ts`. That coupling is not
 * obvious and fails silently — a route missing from the sitemap produces no error, no test
 * failure and no visible symptom — so `tests/unit/navigation.test.ts` asserts every href in
 * every nav array reaches the sitemap.
 */
export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];
