/**
 * Funnel measurement for the guided inquiry.
 *
 * **Why not `@vercel/analytics`.** Two reasons, in order of weight. It will not install: the
 * package declares an optional peer on `@sveltejs/kit`, npm tries to satisfy it, and that pulls
 * vite@8 against this project's vite@7 from Vitest — an ERESOLVE that only clears with
 * `--legacy-peer-deps`, which weakens install integrity for the whole repo to add one script
 * tag. Second, it would be a fifth production dependency against decision #26. The package's
 * real advantage over the raw script is supplying the framework's *dynamic* route pattern
 * (`/blog/[slug]` rather than `/blog/my-post`) — and this site has no dynamic routes at all, so
 * there is nothing to gain. What ships is the same script the package would have loaded.
 *
 * **Gated, and off by default.** The gate mirrors `indexingAllowed` in `seo.ts`: opt in
 * explicitly on the deployment where it is true, and everywhere else this is inert. It exists
 * because the script route 404s until Web Analytics is switched on for the project, and pointing
 * a tag at that would cost a failed request and a console error on every page for no data.
 *
 * Worth knowing for the next environment: enabling the product is not enough on its own. The
 * route is baked into a deployment's routing config, so an existing deployment keeps 404ing
 * until it is rebuilt — enable it, set the flag, then redeploy, in that order.
 *
 * **It must never see an answer.** The consent copy tells the visitor their answers are emailed
 * to Tyler and "not stored on this website" — and missing-inputs #12 rests on every clause of
 * that being true of the build as it stands. Analytics records which step was reached and
 * whether a submission was blocked. It never records what was typed. The payload builders below
 * are the only shapes that get sent, they take no free text, and `tests/unit/analytics.test.ts`
 * scans the form's source to prove no answer value reaches them.
 */

/**
 * True only where explicitly opted in. Unset or any other value keeps analytics off.
 *
 * Trimmed and lowercased, and that is not fussiness — the first time this flag was set for real
 * it was stored as `TRUE`, a strict `=== "true"` rejected it, and the result was a deployment
 * that looked correct in every way while measuring nothing. This value is typed into a dashboard
 * field by a person, so `TRUE`, `True` and a stray trailing space all have to mean what they
 * obviously mean. Anything that is not the word "true" still leaves analytics off.
 *
 * `indexingAllowed` in `seo.ts` is deliberately NOT relaxed the same way. The failure directions
 * are opposite: a mis-cased value here means silently collecting nothing, which is merely
 * useless, while there it means a preview deployment silently becoming indexable. Strictness is
 * the safe default in one and the trap in the other.
 */
export const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS?.trim().toLowerCase() === "true";

/** Served by Vercel itself once Web Analytics is enabled for the project. */
export const ANALYTICS_SCRIPT_SRC = "/_vercel/insights/script.js";

/**
 * Event names are a schema. Renaming one does not migrate its history — it starts a new,
 * empty series beside the old one — so treat these as fixed once they have shipped.
 */
export const analyticsEvents = {
  /** A step came into view. The funnel is the drop-off between consecutive step numbers. */
  inquiryStepReached: "inquiry_step_reached",
  /** The visitor pressed Send. Not a success — the server may still reject it. */
  inquirySubmitted: "inquiry_submitted",
  /** A submission did not go through, and why. The most useful signal on the page. */
  inquiryBlocked: "inquiry_blocked",
  /**
   * A Begin Planning control was pressed. `location` is our own label for where on the site it
   * sits — never a URL, which could carry a query string somebody pasted.
   */
  ctaClicked: "cta_clicked",
  /**
   * The confirmation page rendered. This is the first event that means a *delivered* inquiry:
   * `inquiry_submitted` only means Send was pressed, and the server can still reject it. Until
   * this existed, success was measurable only as a page view on a noindexed route.
   */
  inquiryReceived: "inquiry_received",
  /** Calendly reported a booking. The last rung, and the one the whole funnel exists for. */
  callBooked: "call_booked",
  /** An outbound click to the Luma community calendar. */
  communityClicked: "community_clicked",
} as const;

/** Vercel's payloads take flat scalars only. Deliberately narrow: no objects, no free text. */
type EventValue = string | number | boolean | null;
export type EventPayload = Record<string, EventValue>;

declare global {
  interface Window {
    va?: (...args: unknown[]) => void;
    vaq?: unknown[][];
  }
}

/**
 * Fire an event, safely, from anywhere.
 *
 * No-ops on the server and whenever the gate is off. When the script has not finished loading,
 * the event goes into `window.vaq` — the queue Vercel's own snippet establishes and the script
 * drains on load — so an event fired during hydration is not lost.
 */
export function trackEvent(name: string, payload?: EventPayload): void {
  if (!analyticsEnabled || typeof window === "undefined") return;
  if (typeof window.va === "function") {
    window.va("event", { name, data: payload });
    return;
  }
  window.vaq = window.vaq ?? [];
  window.vaq.push(["event", { name, data: payload }]);
}

/**
 * The only payload shapes that are ever sent. They exist as functions rather than inline object
 * literals at the call sites so there is one place to audit, and so a test can assert the exact
 * key set. `step` is a position and `name` is our own label for a group of fields — neither is
 * anything the visitor typed.
 */
export function inquiryStepPayload(index: number, stepName: string): EventPayload {
  return { step: index + 1, name: stepName };
}

/** `reason` is one of the action's own status strings, never a validation message. */
export function inquiryBlockedPayload(reason: string): EventPayload {
  return { reason };
}

/** Which step the visitor got to before pressing Send — the abandonment signal, inverted. */
export function inquirySubmittedPayload(stepCount: number): EventPayload {
  return { steps: stepCount };
}

/**
 * Where a CTA sits, as our own vocabulary rather than a URL. A pathname would eventually carry
 * a query string someone pasted into the address bar, and that is exactly the kind of free text
 * decision #133 keeps out of the payload.
 */
export type CtaLocation =
  | "hero"
  | "header"
  | "mobile-nav"
  | "final-cta"
  | "travel-planning"
  | "travel-notes"
  | "method"
  | "faq"
  | "about"
  | "contact";

export function ctaClickedPayload(location: CtaLocation): EventPayload {
  return { location };
}

/** No payload worth carrying: the event is the fact that it happened. */
export function inquiryReceivedPayload(): EventPayload {
  return {};
}

export function callBookedPayload(): EventPayload {
  return {};
}

export function communityClickedPayload(location: CtaLocation): EventPayload {
  return { location };
}
