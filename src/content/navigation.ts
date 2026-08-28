import type { NavItem } from "@/types/content";

/** Primary navigation — Charter §8 sitemap. */
export const primaryNav: NavItem[] = [
  { label: "Travel Planning", href: "/travel-planning" },
  { label: "Community", href: "/community" },
  { label: "Travel Notes", href: "/travel-notes" },
  { label: "About", href: "/about" },
];

/** Footer utility navigation — Charter §8. Legal routes live in `legalNav` below. */
export const footerNav: NavItem[] = [
  { label: "Curated Wellness Journeys", href: "/curated-journeys" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

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
