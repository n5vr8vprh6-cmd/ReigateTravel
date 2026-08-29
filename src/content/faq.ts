import { site, credentials } from "@/content/site";

/**
 * /faq — Charter §8 page 9. PURPOSE: "Reduce uncertainty across planning, fees, group travel,
 * wellness, community events and professional support." Those six areas are the six groups below.
 *
 * **Every answer here is [D]** — derived draft pending Gate 3 copy approval.
 *
 * An FAQ is the single most dangerous page on this site for content safety, because its whole
 * form invites a confident factual answer to anything asked. §18 forbids inventing testimonials,
 * **certifications**, affiliations, partnerships, supplier relationships, destination expertise,
 * travel volume, event attendance or history, prices, availability, scarcity, transformation
 * outcomes, health outcomes and personal claims about Tyler.
 *
 * So every answer below traces to one of four sources, and nothing else:
 *
 * 1. The Reigate Method's five approved stages.
 * 2. The guided inquiry's own fields — if the form asks who is travelling, then planning covers
 *    more than one traveller, and saying so invents nothing.
 * 3. Approved metadata in `site.ts`, including the response time and the credential strings.
 * 4. Approved offer status: Bespoke current; Community Experiences and Curated Wellness
 *    Journeys in development.
 *
 * Two questions are answered by declining to answer, on purpose:
 *
 * - **Fees.** Ranges are Tyler's to set and are still outstanding (missing-inputs #3). The
 *   answer says figures are not published and why, rather than inventing a bracket.
 * - **Credentials.** The three strings appear verbatim and nothing is said about what any of
 *   the bodies do or what they entitle a client to. §18 lists certifications as uninventable,
 *   and implying a consumer protection that may not apply would be worse than saying less.
 *   AGENTS.md separately forbids expanding "WTA"; the same restraint is applied to all three.
 *
 * The wellbeing group is written to *disclaim* rather than to claim: it exists to make clear
 * that this is a travel service, not a clinical or therapeutic one.
 */
export const faq = {
  eyebrow: "Frequently Asked Questions",
  heading: "The questions worth asking first.",
  lead: "Planning, fees, who you travel with, what wellbeing means here, community, and the professional side. If something is missing, it is probably better asked directly.",

  groups: [
    {
      id: "planning",
      name: "Planning",
      items: [
        {
          q: "How does planning with Reigate start?",
          a: "With the guided inquiry. It is six short steps about the trip you have in mind: who is travelling, roughly when, and how you would like it to feel. It is not a general contact form — the questions exist so the first conversation is a useful one.",
        },
        {
          q: "What happens after I send an inquiry?",
          a: `Tyler reads it personally and replies, typically within ${site.inquiryResponseTime}. If it looks like a fit, the next step is a conversation rather than a commitment.`,
        },
        {
          q: "Do I need to know where I am going?",
          a: "No. The inquiry asks whether you have a destination in mind or would like recommendations, and being open often produces the better suggestion.",
        },
        {
          q: "How settled do my plans need to be?",
          a: "Less settled than you might think. Rough dates and a rough shape are enough to start; the Define stage is where those become a clear brief.",
        },
      ],
    },
    {
      id: "fees",
      name: "Fees and investment",
      items: [
        {
          q: "What does planning cost?",
          a: "Reigate does not publish figures. What a journey costs depends on where it goes, how long it runs, how many are travelling and how much you would like handled, so the honest answer belongs in a conversation where the numbers are about your trip.",
        },
        {
          q: "When is money discussed?",
          a: "Early, and openly. Investment is part of the brief in the Define stage alongside pace, purpose and priorities — a plan built without it is a plan that has to be rebuilt.",
        },
      ],
    },
    {
      id: "group",
      name: "Travelling with others",
      items: [
        {
          q: "Can you plan for more than one traveller?",
          a: "Yes. The inquiry asks how many people are travelling and how you know each other, because a trip for a couple, a family and a group of friends are three different briefs.",
        },
        {
          q: "What if people on the trip want different things?",
          a: "That is usually the reason to plan with an advisor rather than alone. The inquiry asks what matters most and what you would like help handling, and the balance between those is part of the brief.",
        },
      ],
    },
    {
      id: "wellbeing",
      name: "Wellbeing",
      items: [
        {
          q: "What does Lifestyle Wellness Travel mean here?",
          a: "It describes an orientation rather than a treatment. The brand idea is that travel is part of living well, so planning starts with how you want a trip to feel and what you want to come back with.",
        },
        {
          q: "Is this a health, medical or retreat service?",
          a: "No. Reigate is a travel planning service and makes no health claims. Curated Wellness Journeys are a separate offer still in development, and nothing on this site should be read as clinical or therapeutic advice.",
        },
      ],
    },
    {
      id: "community",
      name: "Community",
      items: [
        {
          q: "Are there events I can attend?",
          a: "Community Experiences are in development. When an experience is confirmed it will be announced here, with registration handled on Luma.",
        },
        {
          q: "How do I hear about things as they happen?",
          a: "The Reigate community calendar is the place to watch. It is where confirmed experiences appear once there is something real to announce.",
        },
      ],
    },
    {
      id: "professional",
      name: "The professional side",
      items: [
        {
          q: "What credentials does Tyler hold?",
          a: `${credentials.join(" · ")}. What each of these means for a particular booking is best answered directly, so please ask.`,
        },
        {
          q: "Who do I reach while a trip is in motion?",
          a: "Tyler. The Support stage of the Method is about clear documentation, preparation, and reachable help while plans are running — one relationship rather than a chain of suppliers.",
        },
        {
          q: "Where is Reigate based?",
          a: "The Greater Toronto Area, planning travel further afield.",
        },
      ],
    },
  ],

  cta: {
    heading: "Still wondering something?",
    body: "The inquiry is the fastest way to get a specific answer, because the answer usually depends on the trip.",
    primary: { label: "Begin Planning", href: "/begin-planning" },
    secondary: { label: "About Travel Planning", href: "/travel-planning" },
  },
} as const;
