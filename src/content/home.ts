import { site } from "@/content/site";

/**
 * Homepage content — the 11 approved Fable storyboard sections.
 * Language marked [A] in the storyboard is approved; [D] is editorially derived draft
 * pending Gate 3 copy approval. All copy here reflects those markers.
 *
 * Eyebrows are deliberately rare. Only the hero (brand category) and the Method (names a
 * proprietary system the heading does not) carry one. Every other section's eyebrow simply
 * restated its heading — "Travel Notes" above "Travel Notes", "Meet Tyler" above a "Meet
 * Tyler" button — which spends the signature device instead of using it. See
 * docs/decisions/decision-log.md #16.
 */
export const home = {
  hero: {
    eyebrow: site.category, // "Lifestyle Wellness Travel" [A]
    heading: site.brandIdea, // "Travel is part of living well." [A]
    body: "Reigate creates thoughtful journeys, personalized travel experiences, and welcoming community events for people who want to explore with greater intention.", // [A]
    primaryCta: { label: "Begin Planning", href: "/begin-planning" },
    secondaryCta: { label: "Explore Reigate", href: "#what-is-reigate" },
    image: {
      src: "/images/hero-coast.png",
      alt: "A woman sits alone on a stone wall overlooking a calm coastline in soft light.",
    },
  },

  explanation: {
    heading: "Thoughtful travel and meaningful experiences for people who want to live well.", // [A]
    body: [
      "Reigate is a lifestyle brand that curates meaningful experiences through travel, community, and personal connection. We bring travel, wellbeing, personal service, and community together in one place.", // [A]/[D]
      "Bespoke Travel Planning is available now. Community Experiences and Curated Wellness Journeys are in development — and you're welcome to follow along as they take shape.", // [A]/[D]
    ],
    link: { label: "Read the Reigate story", href: "/about" },
    image: {
      src: "/images/arched-doorway.png",
      alt: "A view through an arched stone doorway toward a sunlit courtyard.",
    },
  },

  recognition: {
    heading: "Does this sound like you?", // [D]
    statements: [
      "You want the trip to feel as good as the destination.",
      "You are tired of carrying every planning decision.",
      "You value thoughtful recommendations over endless options.",
      "You want a journey shaped around your pace and priorities.",
      "You want connection without losing personal space.",
    ], // all [A]
    bridge: "If any of these feel familiar, Reigate was designed for you.", // [D]
    image: {
      src: "/images/two-women-walking.png",
      alt: "Two women walk slowly along a quiet street in conversation.",
    },
  },

  bespoke: {
    heading: "Bespoke Travel Planning", // [A]
    body: [
      "Bespoke Travel Planning begins with how you want the journey to feel. Reigate turns your priorities, preferences, and ideas into a thoughtfully coordinated travel experience designed around you.", // [A]
      "Tyler handles the thinking and the logistics — destinations, accommodations, pacing, reservations, and preparation — so the plan reflects your life, not a template.", // [D]
      "Fewer decisions to carry. More room to be present.", // [D]
    ],
    cta: { label: "Explore Travel Planning", href: "/travel-planning" },
    image: {
      src: "/images/travel-journal.png",
      alt: "An open travel journal with blank cream pages beside a cup of coffee.",
    },
  },

  method: {
    eyebrow: "The Reigate Method",
    heading: "Thoughtful travel begins by understanding the person before recommending the place.", // [A]
  },

  ecosystem: {
    heading: "One connected relationship", // [A]
    subheading: "Every Reigate experience strengthens the others.", // [D]
  },

  community: {
    // State B — no confirmed event (docs/decisions/missing-inputs.md #4).
    heading: "Community begins close to home.", // [D]
    body: [
      "Reigate Community Experiences bring people together through movement, conversation, local partnerships, and shared moments designed to support living well.", // [A]
      "We're developing our first local gatherings now. There's nothing to register for yet — and we'd rather say that plainly than pretend otherwise. If you'd like to be invited when the first experience is confirmed, the Reigate community is the place to be.", // [D]
    ],
    primaryCta: { label: "Join the Community", href: "#join" },
    secondaryLink: { label: "About Community Experiences", href: "/community" },
    image: {
      src: "/images/oakville-horizon.png",
      alt: "The Lake Ontario horizon seen from the Oakville waterfront.",
    },
  },

  tyler: {
    heading: "Planned by someone who listens first.", // [D]
    body: [
      "Reigate was founded by Tyler — a thoughtful travel advisor, a curious host, and a careful listener. Her approach is simple: understand the person before recommending the place.", // [D]
      "Based in the Greater Toronto Area, Tyler is building Reigate as a trusted relationship clients can return to across different journeys, destinations, and stages of life.", // [A — verbatim from approved bio]
    ],
    cta: { label: "Meet Tyler", href: "/about" },
    // No approved headshot yet → FounderFeature renders the typographic fallback.
  },

  travelNotes: {
    heading: "Travel Notes",
    subheading: `Notes on living and travelling well, from ${site.social.substackPublicationName}.`, // [D]
    // Neutral state when no approved articles exist. Makes no promise of an outbound
    // destination — the publication is unconfirmed (site.social.substack === null).
    emptyState: "New notes are on the way. The first ones will appear here as they're published.",
    readAllLabel: "View all Travel Notes",
  },

  newsletter: {
    heading: "Join the Reigate community.", // [A]
    body: "Thoughtful travel ideas, community invitations, and practical guidance for living and travelling well.", // [A]
    reassurance: "Unsubscribe anytime.", // [D]
  },

  finalCta: {
    heading: "Begin with how you want the journey to feel.", // [A]
    body: "Tell us what you're considering, or simply stay connected — both are welcome.", // [D]
    primaryCta: { label: "Begin Planning", href: "/begin-planning" },
    secondaryCta: { label: "Join the Community", href: "#join" },
    endline: site.endline, // "Experiences That Stay With You." [A] — single small appearance
  },
} as const;
