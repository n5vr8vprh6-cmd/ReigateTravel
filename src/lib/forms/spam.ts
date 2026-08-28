/**
 * Charter §13 requires a hidden bot field and spam protection. Two cheap signals, neither of
 * which inconveniences a real visitor.
 */

export const HONEYPOT_FIELD = "website";
export const RENDERED_AT_FIELD = "renderedAt";

/** A form completed faster than a person can read it. */
const MIN_ELAPSED_MS = 3000;

/**
 * The honeypot is a real, labelled input positioned off-screen — not `display: none` and not
 * inside an `aria-hidden` container, because axe reports a focusable element hidden from the
 * accessibility tree as a serious violation and the a11y gate fails on serious.
 * A screen-reader user hears "Leave this field blank" and does exactly that.
 */
export function honeypotTripped(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * `renderedAt` is stamped on hydration, so it is absent when JavaScript never ran. Absent means
 * "no signal", not "suspicious" — treating it as suspicious would reject exactly the visitors
 * progressive enhancement exists to serve.
 *
 * Deliberately unsigned. Signing needs a server-issued nonce, which makes the page dynamic and
 * gives up static generation, to defeat an attacker who has already chosen to target this one
 * site by hand. The honeypot and a 26-field payload shape handle the generic traffic.
 */
export function submittedTooFast(formData: FormData, now: number = Date.now()): boolean {
  const raw = formData.get(RENDERED_AT_FIELD);
  if (typeof raw !== "string" || !raw) return false;

  const renderedAt = Number(raw);
  if (!Number.isFinite(renderedAt) || renderedAt <= 0) return false;

  const elapsed = now - renderedAt;
  // A negative elapsed time means a clock skew or a forged value; do not reject on it.
  if (elapsed < 0) return false;

  return elapsed < MIN_ELAPSED_MS;
}
