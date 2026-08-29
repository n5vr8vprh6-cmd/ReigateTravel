/**
 * /about — Charter §8 page 5. PURPOSE: "Build trust in Tyler and explain why Reigate exists."
 *
 * **This page is deliberately partial, and that is the safest version of it.**
 *
 * The Charter lists eight content items. Four of them — Tyler's perspective, the Reigate story,
 * her values, and "personal but not overly private founder content" — cannot be written by an
 * agent. §18 forbids inventing personal claims about Tyler, and missing-inputs #8 records the
 * full biography as an outstanding input. The Brand Book, where brand values would live, is a
 * PDF with subset fonts that cannot be read in this environment.
 *
 * So the page is built from what can actually be sourced:
 *
 * - The two approved Tyler paragraphs already in `home.ts`, reused verbatim rather than
 *   paraphrased. Paraphrasing approved biography is how invented claims get in.
 * - The approved credential strings.
 * - Why Reigate exists, derived from the brand promise and brand idea — that is a statement
 *   about the company, not a personal claim about its founder.
 * - How Reigate works, derived from Charter §2's "the website will sell through" list:
 *   clarity, relevance, specificity, trust, warm personal guidance, transparent process,
 *   thoughtful invitation.
 * - What the site will not do, derived from Charter §2's "it will not rely on" list. Publishing
 *   that as a public commitment is unusual and it is honest: it is the brand's own stated
 *   position, and it explains the absence of proof a visitor might otherwise expect.
 *
 * Everything is [D], pending copy approval. When Tyler supplies a biography, her perspective
 * and the founding story belong between `story` and `principles` below.
 */
export const about = {
  eyebrow: "About Reigate",
  heading: "Planned by someone who listens first.",

  // Both paragraphs reused from `home.tyler.body` rather than rewritten. The second is marked
  // in that file as verbatim from the approved bio and must not be reworded here.
  intro:
    "Reigate was founded by Tyler — a thoughtful travel advisor, a curious host, and a careful listener. Her approach is simple: understand the person before recommending the place.",
  founder:
    "Based in the Greater Toronto Area, Tyler is building Reigate as a trusted relationship clients can return to across different journeys, destinations, and stages of life.",

  portrait: {
    src: "/images/tyler-portrait.jpg",
    alt: "Tyler, founder of Reigate Travel & Co.",
  },

  story: {
    heading: "Why Reigate exists.",
    body: [
      "Most travel is sold as a destination. Reigate starts from the belief that travel is part of living well — that a trip is worth planning around how you want to feel, not only around where you land.",
      "That belief is the whole business. It is why planning begins with a conversation rather than a catalogue, why the questions come before the recommendations, and why the aim is a relationship you can return to rather than a single transaction.",
    ],
  },

  principles: {
    heading: "How Reigate works.",
    lead: "Four commitments that shape the service, and the site.",
    items: [
      {
        name: "Specific over general",
        body: "A recommendation you can act on beats a description you cannot. Where something is not yet decided, it is left unsaid rather than filled in.",
      },
      {
        name: "One relationship",
        body: "One advisor who has understood the brief, rather than a chain of confirmations from suppliers who have not spoken to each other.",
      },
      {
        name: "A transparent process",
        body: "The stages are published, the questions are asked up front, and investment is part of the conversation early rather than a surprise at the end.",
      },
      {
        name: "An invitation, not a push",
        body: "Getting in touch is a conversation, not a commitment. Nothing here is designed to hurry you into one.",
      },
    ],
  },

  restraint: {
    heading: "What you will not find here.",
    lead: "Some of these are absent because they are not true yet. Saying so seems better than filling the space.",
    items: [
      "Countdowns, limited spots, or any other manufactured urgency.",
      "Testimonials or client stories. There will be some when there are real ones to publish.",
      "Claims about health outcomes or personal transformation. This is travel planning, not therapy.",
      "Partnerships, awards or affiliations beyond the credentials listed below.",
    ],
  },

  cta: {
    heading: "The best way to know is to describe the trip.",
    body: "Six short steps, and nothing here is a commitment.",
    primary: { label: "Begin Planning", href: "/begin-planning" },
    secondary: { label: "How planning works", href: "/travel-planning" },
  },
} as const;
