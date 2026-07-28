import type { Offer } from "@/types/content";

/**
 * The three-offer ecosystem (Brand Book ch. 15; Charter §4). Descriptors are approved
 * language, lightly person-shifted. Status labels and emphasis enforce the rule that
 * future offers never receive prominence equal to the current commercial service.
 */
export const offers: Offer[] = [
  {
    id: "bespoke",
    name: "Bespoke Travel Planning",
    status: "available",
    description:
      "Personalized travel designed around your goals, preferences, relationships, and pace.",
    href: "/travel-planning",
    linkLabel: "Explore Travel Planning",
    image: {
      src: "/images/boutique-room.png",
      alt: "A boutique hotel room prepared with understated care.",
    },
    emphasis: "primary",
  },
  {
    id: "community",
    name: "Community Experiences",
    status: "in-development",
    description:
      "Local, accessible gatherings — a way to meet Reigate and participate in intentional living.",
    href: "/community",
    linkLabel: "About Community Experiences",
    image: {
      src: "/images/bronte-harbour.png",
      alt: "Bronte Harbour in Oakville on a clear day.",
    },
    emphasis: "secondary",
  },
  {
    id: "journeys",
    name: "Curated Wellness Journeys",
    status: "in-development",
    description:
      "Small-group travel shaped around wellbeing, connection, culture, and thoughtful exploration.",
    href: "/curated-journeys",
    linkLabel: "Learn about Curated Wellness Journeys",
    image: {
      src: "/images/group-walking.png",
      alt: "A small group of women walks along a scenic coastal path.",
    },
    emphasis: "secondary",
  },
];
