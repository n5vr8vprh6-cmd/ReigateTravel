import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  analyticsEnabled,
  analyticsEvents,
  inquiryBlockedPayload,
  inquiryStepPayload,
  inquirySubmittedPayload,
} from "@/lib/analytics";

/**
 * Every file that fires an event, discovered rather than listed.
 *
 * This used to read one hardcoded path, `InquiryForm.tsx`. That was correct while the form was
 * the only instrumented thing on the site; it silently stopped being correct the moment the
 * booking embed, the confirmation beacon and the CTA wrapper started firing events too — a
 * hardcoded path cannot fail when the code it was guarding moves somewhere else. Walking the
 * tree means a new call site is covered the moment it is written, without anyone remembering.
 */
function sourcesThatTrack(): { file: string; source: string }[] {
  const root = path.join(process.cwd(), "src");
  const found: { file: string; source: string }[] = [];

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/[.]tsx?$/.test(entry.name)) continue;
      // The module that defines trackEvent is not a call site.
      if (full.endsWith(path.join("lib", "analytics.ts"))) continue;
      const source = readFileSync(full, "utf8");
      if (source.includes("trackEvent(")) found.push({ file: full, source });
    }
  }

  walk(root);
  return found;
}

const trackingSources = sourcesThatTrack();
const formSource = trackingSources.map((f) => f.source).join("\n");

/**
 * The consent copy tells the visitor their answers are emailed to Tyler and "not stored on this
 * website", and missing-inputs #12 accepts that as informed consent specifically because every
 * clause of it is true of the build. Analytics is the obvious way for that to quietly stop being
 * true — not by anyone deciding to send answers, but by someone reaching for a richer payload
 * later and pulling a field value in with it.
 *
 * So the guard is on the payloads themselves, not on intent.
 */
describe("analytics", () => {
  it("is off unless explicitly switched on", () => {
    // The test environment sets nothing, which is also what production ships as today.
    expect(analyticsEnabled).toBe(false);
  });

  /**
   * This exists because of a real incident. The flag was set for the first time and stored as
   * `TRUE`; a strict `=== "true"` rejected it, and the deployment looked entirely correct while
   * measuring nothing — no error, no failed request, just no data. The value is typed into a
   * dashboard by a person, so the casing they use has to not matter.
   */
  describe("the gate reads a human-entered value", () => {
    const read = async (value: string | undefined) => {
      vi.resetModules();
      if (value === undefined) vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "");
      else vi.stubEnv("NEXT_PUBLIC_ANALYTICS", value);
      const mod = await import("@/lib/analytics");
      return mod.analyticsEnabled;
    };

    afterEach(() => vi.unstubAllEnvs());

    it.each(["true", "TRUE", "True", " true ", "true\n"])("%j switches it on", async (value) => {
      expect(await read(value)).toBe(true);
    });

    it.each(["", "false", "FALSE", "1", "yes", "truthy", "no"])(
      "%j leaves it off",
      async (value) => {
        expect(await read(value)).toBe(false);
      }
    );
  });

  it("sends nothing at all while it is off", async () => {
    const { trackEvent } = await import("@/lib/analytics");
    const win = globalThis as unknown as { va?: unknown; vaq?: unknown[] };
    const before = win.vaq;
    trackEvent("anything", { a: 1 });
    // Neither the direct call nor the queue may be touched.
    expect(win.vaq).toBe(before);
  });

  describe("payloads carry positions and statuses, never anything typed", () => {
    it("the step payload is a number and our own group label", () => {
      const payload = inquiryStepPayload(1, "Journey");
      expect(Object.keys(payload).sort()).toEqual(["name", "step"]);
      expect(payload.step).toBe(2); // 1-based for a human reading a dashboard
      expect(payload.name).toBe("Journey");
    });

    it("the blocked payload carries a status, not a validation message", () => {
      const payload = inquiryBlockedPayload("rate_limited");
      expect(Object.keys(payload)).toEqual(["reason"]);
      // Validation messages are full sentences and can quote what was typed back at the
      // visitor. A status is a single machine token, and that is the whole difference.
      expect(String(payload.reason)).not.toMatch(/\s/);
    });

    it("the submitted payload is a count of steps, nothing more", () => {
      const payload = inquirySubmittedPayload(6);
      expect(Object.keys(payload)).toEqual(["steps"]);
      expect(typeof payload.steps).toBe("number");
    });
  });

  it("every event anywhere on the site uses an approved payload builder", () => {
    expect(trackingSources.length, "the funnel should be instrumented").toBeGreaterThan(0);

    // Every trackEvent call across every file that makes one, with its arguments.
    const calls = trackingSources.flatMap(({ source }) =>
      [...source.matchAll(/trackEvent\(([\s\S]*?)\);/g)].map((m) => m[1]!)
    );
    expect(calls.length, "the funnel should be instrumented").toBeGreaterThan(0);

    const approved = [
      "inquiryStepPayload",
      "inquiryBlockedPayload",
      "inquirySubmittedPayload",
      "ctaClickedPayload",
      "inquiryReceivedPayload",
      "callBookedPayload",
      "communityClickedPayload",
    ];
    for (const call of calls) {
      expect(
        approved.some((builder) => call.includes(builder)),
        `trackEvent must use an approved payload builder, got: ${call.replace(/\s+/g, " ").trim()}`
      ).toBe(true);

      // Lowercased on both sides, and this is the reason: the first version of this loop
      // checked for "values" case-sensitively, so `readValues()` — the single most likely way
      // an answer actually gets in — sailed straight through it. The guard was inert, and it
      // was only caught by planting a real leak and watching it pass. Substring scans are only
      // as good as their casing.
      const haystack = call.toLowerCase();
      for (const leak of ["value", "formdata", "formref", "fielderror", "errors["]) {
        expect(
          haystack.includes(leak),
          `trackEvent must never be passed "${leak}" — that is a visitor's answer`
        ).toBe(false);
      }
    }
  });

  it("names every event it can emit, so the schema is one list", () => {
    const names = Object.values(analyticsEvents);
    expect(new Set(names).size, "event names must be unique").toBe(names.length);
    for (const name of names) {
      // Snake case, no spaces: these become series keys in a dashboard and are hard to rename.
      expect(name).toMatch(/^[a-z]+(_[a-z]+)*$/);
      expect(formSource).toContain(`analyticsEvents.`);
    }
  });
});
