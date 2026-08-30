import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { inquirySteps, enrichmentSteps, inquiryConsent, inquiryCopy } from "@/content/inquiry";

const source = readFileSync(path.join(process.cwd(), "src/content/inquiry.ts"), "utf8");

describe("inquiry content safety", () => {
  /**
   * The inquiry is the hand-raise: enough to reply, enough to judge fit, nothing else.
   * Charter §10's remaining groups were not deleted — they moved to the pre-call enrichment
   * form, which the next assertion pins. Both halves are checked because the whole defence of
   * shortening the inquiry is that no question was actually lost.
   */
  it("asks only the qualifying groups up front", () => {
    expect(inquirySteps.map((s) => s.name)).toEqual(["Contact", "Journey", "Fit"]);
  });

  it("still asks the Charter's deeper groups, after the call is booked", () => {
    expect(enrichmentSteps.map((s) => s.name)).toEqual([
      "You",
      "Purpose",
      "Style",
      "Timing",
      "Context",
    ]);
  });

  it("keeps every question the six-group inquiry asked", () => {
    const asked = new Set([
      ...inquirySteps.flatMap((s) => s.fields).map((f) => f.name),
      ...enrichmentSteps.flatMap((s) => s.fields).map((f) => f.name),
    ]);
    // The exact field set the inquiry carried before it was split. If a question is ever
    // dropped rather than moved, this is where that shows up.
    for (const name of [
      "firstName",
      "lastName",
      "email",
      "phone",
      "preferredContact",
      "considering",
      "destination",
      "dates",
      "flexibility",
      "travellers",
      "relationships",
      "departure",
      "prompting",
      "feel",
      "mattersMost",
      "helpWith",
      "pastFrustration",
      "pace",
      "balance",
      "accommodation",
      "supportLevel",
      "accessibilityNeeds",
      "investment",
      "workedWithAdvisor",
      "heardAbout",
      "anythingElse",
    ]) {
      expect(asked, `${name} should still be asked somewhere`).toContain(name);
    }
  });

  it("gives every field a visible label and a unique name", () => {
    const fields = inquirySteps.flatMap((s) => s.fields);
    for (const field of fields) {
      expect(field.label.trim().length).toBeGreaterThan(0);
    }
    const names = fields.map((f) => f.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("never uses a placeholder as the label", () => {
    for (const field of inquirySteps.flatMap((s) => s.fields)) {
      if (field.placeholder) expect(field.placeholder).not.toBe(field.label);
    }
  });

  /**
   * Charter §10: investment ranges "should be finalized by Tyler before implementation" and are
   * still an open input. Inventing a range would be a content-safety breach, so the step asks an
   * open question. Asserted here so a range cannot be introduced later without someone
   * deliberately deleting this test.
   */
  it("states no investment range and no price", () => {
    const investment = inquirySteps.flatMap((s) => s.fields).find((f) => f.name === "investment")!;
    expect(investment.kind).toBe("textarea");
    // A select would mean ranges, and ranges are Tyler's to set (missing-inputs #3).
    expect(investment.options).toBeUndefined();

    expect(source).not.toMatch(/[$£€]\s?\d/);
    expect(source).not.toMatch(/\d[\d,]*\s*[–—-]\s*\d/);
    expect(source.toLowerCase()).not.toContain("budget range");
  });

  /**
   * Charter §10 forbids auto-subscribing inquiry users, and the publication currently 404s
   * (missing-inputs #9), so there is no honest opt-in to offer yet.
   */
  it("offers no newsletter opt-in", () => {
    const names = [...inquirySteps, ...enrichmentSteps]
      .flatMap((s) => s.fields)
      .map((f) => f.name.toLowerCase());
    for (const name of names) {
      expect(name).not.toContain("newsletter");
      expect(name).not.toContain("subscribe");
    }
    expect(source.toLowerCase()).not.toContain("substack");
  });

  it("keeps consent required, separate, and honest about what happens to answers", () => {
    expect(inquiryConsent.detail.toLowerCase()).toContain("not stored on this website");
    expect(inquiryConsent.detail.toLowerCase()).toContain("mailing list");
    expect(inquiryConsent.requiredMessage.length).toBeGreaterThan(0);
  });

  it("requires only the fields needed to reply to someone", () => {
    const required = inquirySteps
      .flatMap((s) => s.fields)
      .filter((f) => f.required)
      .map((f) => f.name);
    expect(required).toEqual(["firstName", "lastName", "email"]);
  });

  it("never leaks the internal marker into rendered copy", () => {
    expect(source).not.toContain("INPUT REQUIRED");
    expect(JSON.stringify(inquiryCopy)).not.toContain("INPUT REQUIRED");
  });

  it("promises no outcome the business has not confirmed", () => {
    const copy = JSON.stringify(inquiryCopy).toLowerCase();
    for (const claim of ["guarantee", "best price", "exclusive", "award"]) {
      expect(copy).not.toContain(claim);
    }
  });
});
