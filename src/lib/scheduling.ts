/**
 * The booking step that follows a delivered inquiry.
 *
 * **Why this is gated.** Charter §10 permits a scheduling link "only after the intended sales
 * process is confirmed", and §24 still lists the consultation method as an outstanding input.
 * Calendly is the client's chosen tool (recorded in the decision log), but the actual event URL
 * is not supplied yet. So the page renders the booking step when a URL exists and the existing
 * "Tyler will reply" copy when it does not — the same discipline as `emailConfigured` and
 * `analyticsEnabled`. The site never shows a control it cannot honour.
 *
 * **Why the host is checked.** This value is injected into a `data-url` attribute that a
 * third-party script turns into an embedded iframe. Anything that becomes an embed on the
 * strength of an environment variable deserves to have its origin pinned, so a typo or a bad
 * dashboard paste fails closed to the neutral state rather than framing an arbitrary site.
 */
const RAW = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? "";

function isCalendly(value: string): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "calendly.com";
  } catch {
    // Not a URL at all. Fail closed.
    return false;
  }
}

export const schedulingUrl: string | null = isCalendly(RAW) ? RAW : null;
export const schedulingEnabled = schedulingUrl !== null;

/** Calendly's own embed script. Loaded only on the page that books, and only when configured. */
export const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

/** The origin Calendly posts its `calendly.*` messages from. Anything else is ignored. */
export const CALENDLY_ORIGIN = "https://calendly.com";
