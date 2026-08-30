import { site } from "@/content/site";

/**
 * The accessibility statement.
 *
 * **Every claim here is either enforced by a test or is a design rule that is actually
 * implemented, and nothing is aspirational.** That constraint is the whole point: a statement
 * that overstates conformance is worse than the shell it replaces, because someone relying on
 * it has been told something untrue about whether they can use the site.
 *
 * So the wording is deliberately narrow in places. "Automated checks cover the pages listed"
 * rather than "the site is tested", because six routes are scanned and the rest are not.
 * "No independent audit" is stated plainly rather than omitted. The limitations section exists
 * because a statement without one is a marketing page.
 *
 * Unlike Privacy and Terms this is **not** legal copy — it is a factual description of what the
 * build does, which is why it could be written here at all. What it deliberately does NOT do is
 * make a regulatory claim: there is no assertion of AODA compliance, because that is a legal
 * determination about the business rather than a statement about the website, and it needs the
 * same treatment the Privacy Policy got. Recorded in `missing-inputs.md`.
 */

export interface AccessibilityGroup {
  id: string;
  heading: string;
  intro?: string;
  items: readonly string[];
}

export const accessibility = {
  eyebrow: "Accessibility",
  heading: "Designed to be usable by everyone.",
  lead: "Reigate aims to meet WCAG 2.2 Level AA. This page sets out what that means in practice on this site, how it is checked, and where the gaps still are.",
  lastReviewed: "August 30, 2026",

  groups: [
    {
      id: "what-this-site-does",
      heading: "What this site does",
      intro:
        "These are not intentions. Each one is built into the site today and most are held in place by an automated test that fails if it stops being true.",
      items: [
        "Every control can be reached and operated by keyboard alone, in the order it appears on the page, with a visible focus outline. A skip link is the first thing a keyboard user reaches.",
        "The mobile menu closes on Escape and returns focus to the button that opened it.",
        "Motion is treated as an enhancement. If your system asks for reduced motion, animations are not merely shortened — they do not run, and the page renders in its settled state. Nothing on this site needs movement to make sense.",
        "The site works without JavaScript. The homepage renders in full, and the guided inquiry becomes one long form that still submits.",
        "Interactive controls are sized to at least 44 by 44 pixels.",
        "Colour is never the only thing carrying meaning. Where something has a status, that status is written in words.",
        "Every page has one main heading and no skipped heading levels, inside proper page landmarks.",
        "Images that carry information have descriptions. Images that are purely decorative are marked so a screen reader skips them rather than reading a filename.",
        "Form fields have visible labels — never a placeholder standing in for one — and any error is written in text and tied to the field it belongs to.",
        "Body text uses only colour combinations that have been measured against the contrast minimums, on every surface it appears on.",
      ],
    },
    {
      id: "how-it-is-checked",
      heading: "How this is checked",
      items: [
        "Automated checks run with axe-core against the WCAG 2.0, 2.1 and 2.2 A and AA rule sets, at 390, 768 and 1440 pixels wide. A build cannot ship with any serious or critical finding.",
        "The pages listed below are covered by that automated run, including the guided inquiry's error state and its confirmation page. Other pages are reviewed by hand but are not part of it.",
        "Keyboard operation, focus handling, reduced-motion behaviour and rendering without JavaScript each have their own tests, separate from the automated scan.",
        "Layouts are reviewed by eye from 390 pixels upward.",
      ],
    },
    {
      id: "limitations",
      heading: "Where the gaps are",
      intro:
        "Being specific about what has not been done seems more useful than a blanket claim of conformance.",
      items: [
        "This site has not had an independent accessibility audit. Everything above is our own testing.",
        "Automated tools catch a minority of accessibility problems. They cannot judge whether a description is meaningful, whether an order makes sense, or whether wording is clear.",
        "Some scroll-linked motion needs a recent browser. Where it is unsupported the page renders in its settled state, which is complete and readable — nothing is lost, it simply does not move.",
        "This statement covers this website. It is not a statement about Reigate's obligations as a business under provincial accessibility legislation.",
        "The site has not yet been tested with every screen reader and browser pairing.",
      ],
    },
  ] as readonly AccessibilityGroup[],

  /**
   * The routes actually in the axe run. Exposed as data rather than described in prose because
   * prose cannot be checked: if a scan is removed, the statement should fail a test rather than
   * quietly become untrue. `tests/unit/accessibility-content.test.ts` holds these against what
   * `tests/a11y/` really visits.
   */
  testedRoutes: [
    { label: "Homepage", path: "/" },
    { label: "About", path: "/about" },
    { label: "Travel Planning", path: "/travel-planning" },
    { label: "Frequently asked questions", path: "/faq" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "This page", path: "/accessibility" },
    { label: "Begin Planning", path: "/begin-planning" },
    { label: "Inquiry confirmation", path: "/begin-planning/received" },
    { label: "Pre-call notes", path: "/begin-planning/prepare" },
    { label: "Pre-call notes confirmation", path: "/begin-planning/prepare/received" },
  ],

  feedback: {
    heading: "Tell us about a barrier",
    body: [
      "If something on this site was difficult or impossible to use, we would genuinely like to know — including which page it was, what you were trying to do, and the browser or assistive technology you were using, if you know it.",
      `Email ${site.inquiryEmail} and Tyler will read it personally. If it is something we can fix, we will fix it; if it will take longer, we will tell you that instead.`,
    ],
  },
} as const;
