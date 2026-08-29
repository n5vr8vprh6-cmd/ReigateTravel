/**
 * /travel-planning — the Bespoke Travel Planning service page.
 *
 * Charter §8 page 2. PURPOSE: "Convert qualified travel-ready visitors into inquiries", with
 * nine content items: who the service is for, what Reigate helps with, why professional
 * planning matters, the Reigate Method, the planning process, service boundaries, investment
 * context, frequently asked questions, and the guided inquiry CTA.
 *
 * **Every string here is [D]** — editorially derived draft in brand voice, pending Gate 3 copy
 * approval, same convention as `home.ts`. The Charter is explicit that it "does not approve
 * public copy, unverified proof, fees, legal language or future-offer details", so nothing on
 * this page is presented as approved language.
 *
 * What is deliberately absent, and why:
 *
 * - **No fees or figures anywhere.** Investment ranges are missing-inputs #3 and the Charter
 *   says Tyler finalises them. The investment section describes how the subject is handled,
 *   which is supportable from Method stage 2 ("Define... investment range"), and states no
 *   number. A unit test asserts this file carries no currency figure.
 * - **No destination or supplier claims.** No regions, no properties, no partner perks, no
 *   amenity or upgrade language. Charter §18 forbids inventing destination expertise and
 *   supplier relationships, and none has been supplied.
 * - **No volume or experience claims.** Nothing about how many trips, how many years, how many
 *   clients. No testimonials, and no proxy for one.
 * - **Service boundaries are stated as offer status, not as exclusions.** Saying "we do not do
 *   X" would be inventing a boundary; saying which offers are current and which are in
 *   development is approved status straight from the Charter.
 */
export const travelPlanning = {
  eyebrow: "Bespoke Travel Planning",
  heading: "Travel designed around how you want to feel.",
  lead: "Reigate's current service is bespoke planning: one advisor, one relationship, and a journey shaped around the people travelling rather than a template.",

  audience: {
    heading: "Who this is for.",
    lead: "Planning with an advisor suits some trips and not others. This is the shape of the ones it suits.",
    statements: [
      "You have a trip in mind and limited time to research it properly.",
      "You would rather have a considered recommendation than forty browser tabs.",
      "The way the trip feels matters as much as where it goes.",
      "You are travelling with people whose needs differ from your own.",
      "You want one person who knows the whole picture when something changes.",
    ],
  },

  helpsWith: {
    heading: "What Reigate helps with.",
    body: [
      "Planning starts with the shape of the journey rather than a destination: why you are going, how you want it to feel, who is travelling, and what you would rather not have to think about.",
      "From there the work is judgement. Understanding the brief well enough to make a small number of informed recommendations, arranging what has been agreed, and keeping the details in one place so you are not the one holding them.",
    ],
    image: {
      src: "/images/travel-journal.png",
      alt: "An open travel journal with blank cream pages beside a cup of coffee.",
    },
  },

  whyAdvisor: {
    heading: "Why plan this way.",
    body: [
      "Most trips can be booked without help. The question is what the research costs you, and how much of the result depends on getting a series of small judgements right.",
      "An advisor is one accountable relationship rather than a chain of confirmation emails from unrelated suppliers. Someone who has understood the brief, who can say why a recommendation is being made, and who is reachable while the trip is in motion.",
    ],
    image: {
      src: "/images/two-women-walking.png",
      alt: "Two women walk slowly along a quiet street in conversation.",
    },
  },

  method: {
    eyebrow: "The Reigate Method",
    heading: "Five stages, in order.",
    lead: "The order carries meaning. Each stage exists because skipping it shows up later in the trip.",
  },

  scope: {
    heading: "What is available today.",
    body: [
      "Bespoke Travel Planning is the service operating now, and it is the only one you can begin here.",
      "Community Experiences and Curated Wellness Journeys are in development. They are described elsewhere on the site so you can follow how they take shape, but neither is bookable yet and neither is presented as though it were.",
    ],
    link: { label: "See the full picture", href: "/#what-is-reigate" },
  },

  investment: {
    heading: "On investment.",
    body: [
      "Investment is part of the conversation early, not a surprise at the end. It shapes the brief in the Define stage alongside pace, purpose and priorities, because a plan built without it is a plan that has to be rebuilt.",
      "Reigate does not publish figures here. What a journey costs depends on where it goes, how long it runs, how many are travelling and what you would like handled — so the honest version of this answer belongs in a conversation, where the numbers can be about your trip rather than a bracket on a page.",
    ],
  },

  questions: {
    heading: "Before you get in touch.",
    items: [
      {
        q: "What happens after I send an inquiry?",
        a: "Tyler reads it personally and replies. If it looks like a fit, the next step is a conversation rather than a commitment.",
      },
      {
        q: "How much detail do you need up front?",
        a: "Less than you might think. Rough answers are useful — the inquiry exists to understand the shape of the trip, not to finalise it.",
      },
      {
        q: "What if the dates or the destination are not settled?",
        a: "That is a normal starting point. Openness about where and when often produces the better recommendation.",
      },
      {
        q: "Is this only for particular kinds of travel?",
        a: "Planning is bespoke, so the shape varies. The clearest way to know whether it suits your trip is to describe it.",
      },
    ],
  },

  cta: {
    heading: "Start by describing the trip.",
    body: "Six short steps, and nothing here is a commitment.",
    primary: { label: "Begin Planning", href: "/begin-planning" },
    secondary: { label: "Meet Tyler", href: "/about" },
  },
} as const;
