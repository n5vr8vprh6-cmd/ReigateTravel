import type { NavItem } from "@/types/content";

/** Primary navigation — Charter §8 sitemap. */
export const primaryNav: NavItem[] = [
  { label: "Travel Planning", href: "/travel-planning" },
  { label: "Community", href: "/community" },
  { label: "Travel Notes", href: "/travel-notes" },
  { label: "About", href: "/about" },
];

/** Footer utility + legal navigation — Charter §8. */
export const footerNav: NavItem[] = [
  { label: "Curated Wellness Journeys", href: "/curated-journeys" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];
