import { beforeEach, describe, expect, it } from "vitest";
import {
  honeypotTripped,
  submittedTooFast,
  HONEYPOT_FIELD,
  RENDERED_AT_FIELD,
} from "@/lib/forms/spam";
import { checkRateLimit, hashClient, resetRateLimit } from "@/lib/forms/rate-limit";

function form(entries: Record<string, string>): FormData {
  const data = new FormData();
  for (const [k, v] of Object.entries(entries)) data.set(k, v);
  return data;
}

describe("honeypot", () => {
  it("is not tripped by an untouched form", () => {
    expect(honeypotTripped(form({}))).toBe(false);
    expect(honeypotTripped(form({ [HONEYPOT_FIELD]: "" }))).toBe(false);
    expect(honeypotTripped(form({ [HONEYPOT_FIELD]: "   " }))).toBe(false);
  });

  it("is tripped when something filled it in", () => {
    expect(honeypotTripped(form({ [HONEYPOT_FIELD]: "https://spam.example" }))).toBe(true);
  });
});

describe("submission timing", () => {
  const now = 1_700_000_000_000;

  it("rejects a form completed faster than a person could read it", () => {
    expect(submittedTooFast(form({ [RENDERED_AT_FIELD]: String(now - 500) }), now)).toBe(true);
  });

  it("accepts a form completed at human speed", () => {
    expect(submittedTooFast(form({ [RENDERED_AT_FIELD]: String(now - 45_000) }), now)).toBe(false);
  });

  it("treats a missing stamp as no signal, not as suspicion", () => {
    // The stamp is written on hydration, so it is absent exactly when JavaScript never ran —
    // the visitors progressive enhancement exists to serve.
    expect(submittedTooFast(form({}), now)).toBe(false);
    expect(submittedTooFast(form({ [RENDERED_AT_FIELD]: "" }), now)).toBe(false);
  });

  it("does not reject on a garbled or skewed stamp", () => {
    expect(submittedTooFast(form({ [RENDERED_AT_FIELD]: "tomorrow" }), now)).toBe(false);
    expect(submittedTooFast(form({ [RENDERED_AT_FIELD]: String(now + 60_000) }), now)).toBe(false);
  });
});

describe("rate limiting", () => {
  beforeEach(() => resetRateLimit());

  it("allows a normal number of inquiries then blocks", () => {
    const key = hashClient("203.0.113.5");
    expect(checkRateLimit(key).allowed).toBe(true);
    expect(checkRateLimit(key).allowed).toBe(true);
    expect(checkRateLimit(key).allowed).toBe(true);
    const blocked = checkRateLimit(key);
    expect(blocked.allowed).toBe(false);
    expect(blocked.reason).toBe("per-client");
  });

  it("lets the window slide rather than resetting it", () => {
    const key = hashClient("203.0.113.6");
    const t0 = 1_700_000_000_000;
    for (let i = 0; i < 3; i++) checkRateLimit(key, t0);
    expect(checkRateLimit(key, t0).allowed).toBe(false);
    // Past the short window, but still inside the long one.
    expect(checkRateLimit(key, t0 + 16 * 60 * 1000).allowed).toBe(true);
  });

  it("keeps separate clients separate", () => {
    const a = hashClient("203.0.113.7");
    const b = hashClient("203.0.113.8");
    for (let i = 0; i < 3; i++) checkRateLimit(a);
    expect(checkRateLimit(a).allowed).toBe(false);
    expect(checkRateLimit(b).allowed).toBe(true);
  });

  it("caps the whole instance, so a bypass has a bounded blast radius", () => {
    const t0 = 1_700_000_000_000;
    // Spread across many clients so no per-client limit fires first.
    let allowed = 0;
    for (let i = 0; i < 60; i++) {
      if (checkRateLimit(hashClient(`198.51.100.${i}`), t0).allowed) allowed++;
    }
    expect(allowed).toBe(40);
  });

  it("hashes the client rather than storing an address", () => {
    const ip = "203.0.113.9";
    const hash = hashClient(ip);
    expect(hash).not.toContain(ip);
    expect(hash).toHaveLength(32);
    expect(hashClient(ip)).toBe(hash);
    expect(hashClient("203.0.113.10")).not.toBe(hash);
  });

  it("handles a missing address without throwing", () => {
    expect(hashClient(null)).toHaveLength(32);
  });
});
