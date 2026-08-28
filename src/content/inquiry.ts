import type { InquiryStep } from "@/types/content";

/**
 * The guided inquiry — Charter §10, six groups, in the Charter's own order.
 *
 * Held as typed content rather than JSX so one definition drives three things: what the form
 * renders, what the server validates, and what the notification email iterates to build its
 * body. A field added here appears in all three without being retyped anywhere.
 *
 * Two content-safety rules bind this file:
 *
 * 1. **No investment ranges.** Charter §10 says ranges "should be finalized by Tyler before
 *    implementation" and they are still an open input (missing-inputs #3). The Investment step
 *    asks an open question instead. A unit test asserts this file carries no currency figure and
 *    no numeric range, so ranges cannot be added later without deliberately deleting that test.
 * 2. **No newsletter opt-in.** Charter §10 forbids auto-subscribing inquiry users and requires
 *    separate explicit consent — but the publication currently 404s (missing-inputs #9), so
 *    offering to subscribe someone would promise a destination that does not exist. When the
 *    publication is live, add an unchecked, separately-labelled opt-in here.
 *
 * Only four fields are required. This is a qualification instrument, not a gate: the minimum
 * needed to reply to someone is a name, an address to reply to, and consent to be replied to.
 */
export const inquirySteps: readonly InquiryStep[] = [
  {
    id: "contact",
    name: "Contact",
    heading: "First, how to reach you.",
    fields: [
      {
        name: "firstName",
        label: "First name",
        kind: "text",
        required: true,
        autoComplete: "given-name",
        maxLength: 80,
        requiredMessage: "Please add your first name so we know who we are speaking with.",
      },
      {
        name: "lastName",
        label: "Last name",
        kind: "text",
        required: true,
        autoComplete: "family-name",
        maxLength: 80,
        requiredMessage: "Please add your last name.",
      },
      {
        name: "email",
        label: "Email address",
        kind: "email",
        required: true,
        autoComplete: "email",
        maxLength: 254,
        help: "This is where Tyler will reply.",
        requiredMessage: "Please add an email address so Tyler can reply.",
      },
      {
        name: "phone",
        label: "Phone number (optional)",
        kind: "tel",
        autoComplete: "tel",
        maxLength: 40,
      },
      {
        name: "preferredContact",
        label: "How would you prefer to be contacted?",
        kind: "radio",
        options: [
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
          { value: "either", label: "Either is fine" },
        ],
      },
    ],
  },
  {
    id: "journey",
    name: "Journey",
    heading: "What you are considering.",
    lead: "Nothing here needs to be settled. Rough answers are genuinely useful.",
    fields: [
      {
        name: "considering",
        label: "What are you considering?",
        kind: "textarea",
        maxLength: 2000,
        help: "A sentence is plenty. A paragraph is welcome.",
      },
      {
        name: "destination",
        label: "Destination, or open to recommendations?",
        kind: "textarea",
        maxLength: 1000,
        placeholder: "Somewhere in particular, or say you would like suggestions",
      },
      {
        name: "dates",
        label: "Approximate dates",
        kind: "text",
        maxLength: 200,
        placeholder: "A month or a season is fine",
      },
      {
        name: "flexibility",
        label: "How fixed are those dates?",
        kind: "select",
        options: [
          { value: "fixed", label: "Fixed — they cannot move" },
          { value: "some", label: "Some flexibility" },
          { value: "flexible", label: "Very flexible" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
      { name: "travellers", label: "How many travellers?", kind: "text", maxLength: 100 },
      {
        name: "relationships",
        label: "Who is travelling together?",
        kind: "text",
        maxLength: 300,
        help: "Partners, family, friends, or travelling solo.",
      },
      {
        name: "departure",
        label: "Departing from",
        kind: "text",
        maxLength: 200,
        autoComplete: "address-level2",
      },
    ],
  },
  {
    id: "purpose",
    name: "Purpose",
    heading: "What is behind the trip.",
    lead: "This is the part that shapes the planning most.",
    fields: [
      {
        name: "prompting",
        label: "What is prompting this journey?",
        kind: "textarea",
        maxLength: 2000,
      },
      {
        name: "feel",
        label: "How would you like the trip to feel?",
        kind: "textarea",
        maxLength: 2000,
      },
      {
        name: "mattersMost",
        label: "What matters most to you?",
        kind: "textarea",
        maxLength: 2000,
      },
      {
        name: "helpWith",
        label: "What would you like help handling?",
        kind: "textarea",
        maxLength: 2000,
      },
      {
        name: "pastFrustration",
        label: "What has frustrated you about planning travel before?",
        kind: "textarea",
        maxLength: 2000,
      },
    ],
  },
  {
    id: "style",
    name: "Style",
    heading: "How you like to travel.",
    fields: [
      {
        name: "pace",
        label: "Preferred pace",
        kind: "select",
        options: [
          { value: "slow", label: "Slow — fewer places, more time in each" },
          { value: "balanced", label: "Balanced" },
          { value: "full", label: "Full — see as much as possible" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
      {
        name: "balance",
        label: "The balance you are after",
        kind: "textarea",
        maxLength: 1500,
        help: "Rest, culture, food, movement, exploration — in whatever mix suits you.",
      },
      {
        name: "accommodation",
        label: "Accommodation preferences",
        kind: "textarea",
        maxLength: 1500,
      },
      {
        name: "supportLevel",
        label: "How much planning support would you like?",
        kind: "select",
        options: [
          { value: "full", label: "Handle everything" },
          { value: "key", label: "The key pieces, and I will fill in the rest" },
          { value: "guidance", label: "Guidance and recommendations" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
      {
        name: "accessibilityNeeds",
        label: "Accessibility or other travel considerations",
        kind: "textarea",
        maxLength: 1500,
        help: "Mobility, dietary, medical, or anything else worth planning around.",
      },
    ],
  },
  {
    id: "investment",
    name: "Investment",
    heading: "What you are comfortable investing.",
    lead: "An approximate answer is fine, and it stays between you and Tyler.",
    fields: [
      {
        name: "investment",
        label: "What total trip investment are you comfortable considering?",
        kind: "textarea",
        maxLength: 1000,
        help: "Please say whether that includes flights.",
      },
    ],
  },
  {
    id: "context",
    name: "Context",
    heading: "A little context.",
    fields: [
      {
        name: "workedWithAdvisor",
        label: "Have you worked with a travel advisor before?",
        kind: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "heardAbout",
        label: "How did you hear about Reigate?",
        kind: "select",
        options: [
          { value: "referral", label: "A referral" },
          { value: "search", label: "Search" },
          { value: "instagram", label: "Instagram" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "event", label: "An event" },
          { value: "other", label: "Somewhere else" },
        ],
      },
      {
        name: "anythingElse",
        label: "Anything else Tyler should know?",
        kind: "textarea",
        maxLength: 2000,
      },
    ],
  },
];

/** Every field name the server will accept. Anything else in the payload is dropped. */
export const inquiryFieldNames: readonly string[] = inquirySteps.flatMap((step) =>
  step.fields.map((field) => field.name)
);

export const inquiryConsent = {
  name: "consent",
  /**
   * The consent text states the substance inline rather than leaning on the policy page,
   * because /privacy currently reads "content pending legal review" (missing-inputs #8).
   * Every clause below is true of the implementation as built — including "not stored on
   * this website", which holds only because no submission record is kept. If that changes,
   * this sentence has to change with it.
   */
  label:
    "I agree that Reigate may use what I have shared here to respond to my inquiry and plan travel on my behalf.",
  detail:
    "Your answers are emailed to Tyler. They are not stored on this website, sold, or added to any mailing list.",
  requiredMessage: "Please confirm this so Tyler can reply to you.",
} as const;

export const inquiryCopy = {
  eyebrow: "Begin Planning",
  heading: "Tell us what you are considering.",
  lead: "Your answers help Tyler understand what matters to you, and whether Reigate is the right planning partner. Six short steps, and nothing here is a commitment.",
  submitLabel: "Send my inquiry",
  submittingLabel: "Sending…",
  continueLabel: "Continue",
  backLabel: "Back",
  errorSummaryHeading: "There is something to fix",
  /** Shown when delivery fails. Never a false success — the answers stay on screen. */
  deliveryFailed:
    "We could not deliver your inquiry just now. Nothing is lost — your answers are still here.",
  rateLimited:
    "That is a few inquiries from this connection in a short time. Please wait a few minutes and try again.",
} as const;
