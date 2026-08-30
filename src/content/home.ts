import { site, communityCta, credentials } from "@/content/site";

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
    // Was "Explore Reigate" → #what-is-reigate, which is [A] copy in the Gate-4 storyboard and
    // named in both Brand Book ch. 36 and Charter §9. Changed at client direction after an
    // external review called it vague: it asked the visitor to explore a brand rather than
    // offering a next step, and it pointed at an on-page explainer rather than the service.
    // The concern was raised before the change, not after. See source-conflicts.md #9.
    secondaryCta: { label: "How Planning Works", href: "/travel-planning" },
    image: {
      src: "/images/hero-coast.png",
      alt: "A woman sits alone on a stone wall overlooking a calm coastline in soft light.",
    },
  },

  /**
   * The category line and the credentials, sitting directly under the hero. [D]
   *
   * The hero is approved copy and stays exactly as it is: "Travel is part of living well." is
   * the brand idea and "Lifestyle Wellness Travel" is the category, both [A]. Neither says what
   * a visitor can actually hire, and an external review found that the business Reigate is in
   * was not obvious within the first screen. This adds the missing sentence rather than editing
   * an approved one.
   *
   * The credentials moved up from the founder section for the same reason — they are the only
   * third-party proof the site has while there are no testimonials, and they were doing that
   * work two-thirds of the way down the page.
   */
  positioning: {
    statement:
      "Personal travel planning with Tyler Reigate — thoughtfully designed journeys shaped around your pace, your priorities, and the people you are travelling with.",
    credentials,
  },

  explanation: {
    heading: "Thoughtful travel and meaningful experiences for people who want to live well.", // [A]
    body: [
      "Reigate is a lifestyle brand that curates meaningful experiences through travel, community, and personal connection. We bring travel, wellbeing, personal service, and community together in one place.", // [A]/[D]
      "Bespoke Travel Planning is available now. Community Experiences and Curated Wellness Journeys are in development — and you're welcome to follow along as they take shape.", // [A]/[D]
    ],
    link: { label: "Read the Reigate story", href: "/about" },
    // This section renders a scroll-scrubbed sequence rather than a still: the woman walks
    // down the steps as the visitor descends the page, and back up on the way up. The frames
    // were generated from `arched-doorway.png`, which stays in public/images as the source
    // of frame 0 — `src` below points at the sprite strip that is actually rendered, so the
    // content object does not claim an asset the page no longer uses.
    image: {
      src: "/images/stairs-sequence.jpg",
      sourceStill: "/images/arched-doorway.png",
      frames: 24,
      frameWidth: 512,
      frameHeight: 640,
      alt: "A woman walks down stone steps through an arched doorway toward a sunlit bay.",
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
    // Luma is the confirmed destination for community gatherings (verified 200, 2026-07-28).
    // Read from site.social.luma rather than hardcoded — a single edit disables it if that
    // ever changes, and `external` marks it as leaving the site for screen-reader users.
    primaryCta: communityCta,
    secondaryLink: { label: "About Community Experiences", href: "/community" },
    // Scroll-scrubbed like the Reigate story section: the water moves and the sailboat
    // drifts right-to-left toward the copy panel. Frames generated from `oakville-horizon.png`,
    // which stays in public/images as the source of frame 0.
    image: {
      src: "/images/sailboat-sequence.jpg",
      sourceStill: "/images/oakville-horizon.png",
      frames: 20,
      frameWidth: 1024,
      frameHeight: 574,
      alt: "A sailboat drifts across the Lake Ontario horizon seen from the Oakville waterfront.",
    },
  },

  // The coastline interlude, as a clip that plays itself.
  //
  // Generated with Kling from `mediterranean-coastline.png`, then re-encoded from the 15.1MB
  // 1080p original down to 0.28MB of H.264 at 1280x720 - lighter than the 1.4MB sprite strip it
  // replaced, and lighter than the 6.3MB hero video that decision #43 removed.
  //
  // The poster is frame 0, so wherever the clip cannot play the band still shows the coastline.
  coastline: {
    src: "/video/coastline.mp4",
    poster: "/images/coastline-poster.jpg",
    sourceStill: "/images/mediterranean-coastline.png",
  },

  tyler: {
    heading: "Planned by someone who listens first.", // [D]
    body: [
      "Reigate was founded by Tyler — a thoughtful travel advisor, a curious host, and a careful listener. Her approach is simple: understand the person before recommending the place.", // [D]
      "Based in the Greater Toronto Area, Tyler is building Reigate as a trusted relationship clients can return to across different journeys, destinations, and stages of life.", // [A — verbatim from approved bio]
    ],
    cta: { label: "Meet Tyler", href: "/about" },
    // Approved headshot, supplied by the client and confirmed cleared for commercial use
    // (missing-inputs #1, closed). The alt names the person because this is a portrait of a
    // real, named individual - unlike the editorial imagery elsewhere, which is described
    // rather than identified.
    portrait: {
      src: "/images/tyler-portrait.jpg",
      alt: "Tyler, founder of Reigate Travel & Co.",
    },
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
    secondaryCta: communityCta,
    endline: site.endline, // "Experiences That Stay With You." [A] — single small appearance
  },
} as const;
