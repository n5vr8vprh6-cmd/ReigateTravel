import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The booking URL becomes a third-party iframe on the confirmation page, so it is validated
 * rather than trusted. These cases are the reason: a value typed into a dashboard field by a
 * person, at some future date, by someone who will not be reading this file.
 */
async function load(value: string | undefined) {
  vi.resetModules();
  if (value === undefined) delete process.env.NEXT_PUBLIC_CALENDLY_URL;
  else process.env.NEXT_PUBLIC_CALENDLY_URL = value;
  return import("@/lib/scheduling");
}

describe("booking configuration", () => {
  const original = process.env.NEXT_PUBLIC_CALENDLY_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_CALENDLY_URL;
  });

  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_CALENDLY_URL;
    else process.env.NEXT_PUBLIC_CALENDLY_URL = original;
  });

  it("is off when unset, which is how this ships", async () => {
    const { schedulingEnabled, schedulingUrl } = await load(undefined);
    expect(schedulingEnabled).toBe(false);
    expect(schedulingUrl).toBeNull();
  });

  it("accepts a Calendly event URL", async () => {
    const url = "https://calendly.com/reigatetravel/planning-conversation";
    const mod = await load(url);
    expect(mod.schedulingUrl).toBe(url);
    expect(mod.schedulingEnabled).toBe(true);
  });

  it("tolerates surrounding whitespace, because a pasted value carries it", async () => {
    const mod = await load("  https://calendly.com/reigatetravel/x  ");
    expect(mod.schedulingUrl).toBe("https://calendly.com/reigatetravel/x");
  });

  /**
   * Fails closed, every time. An unrecognised value must render the neutral "Tyler will reply"
   * state rather than framing whatever it points at — the same discipline as an unverified
   * Substack URL being disabled rather than linked.
   */
  it.each([
    ["a non-Calendly host", "https://evil.example.com/book"],
    ["a lookalike host", "https://calendly.com.evil.example.com/book"],
    ["a subdomain that is not the real one", "https://api.calendly.com/book"],
    ["plain http", "http://calendly.com/reigatetravel/x"],
    ["a javascript URL", "javascript:alert(1)"],
    ["a bare word", "calendly"],
    ["an empty string", ""],
  ])("rejects %s", async (_label, value) => {
    const mod = await load(value);
    expect(mod.schedulingUrl).toBeNull();
    expect(mod.schedulingEnabled).toBe(false);
  });
});
