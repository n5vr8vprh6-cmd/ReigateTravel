import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { about } from "@/content/about";
import { home } from "@/content/home";
import { credentials } from "@/content/site";

const source = readFileSync(path.join(process.cwd(), "src/content/about.ts"), "utf8");
const allCopy = JSON.stringify(about).toLowerCase();

/**
 * /about is the page §18 protects most directly: it forbids inventing personal claims about
 * Tyler, and Tyler is the subject. The biography beyond the two approved paragraphs is
 * missing-inputs #8, so these tests exist to keep the gap a gap rather than let it fill in.
 */
describe("about content safety", () => {
  it("reuses the approved Tyler paragraphs verbatim rather than paraphrasing them", () => {
    // Paraphrasing approved biography is precisely how an invented claim gets in.
    expect(about.intro).toBe(home.tyler.body[0]);
    expect(about.founder).toBe(home.tyler.body[1]);
  });

  it("adds no biographical fact beyond those paragraphs", () => {
    for (const w of [
      "grew up",
      "studied",
      "graduated",
      "degree",
      "before founding",
      "spent years",
      "career",
      "she has visited",
      "her favourite",
      "her favorite",
      "lived in",
      "family",
    ]) {
      expect(allCopy, `biographical claim not sourced from the approved bio: ${w}`).not.toContain(
        w
      );
    }
    // No year, count or duration attached to Tyler.
    expect(allCopy).not.toMatch(/\d+\s*(years|countries|trips|clients)/);
  });

  it("states the credentials nowhere except as the approved strings", () => {
    // The page renders `credentials.join(" · ")` directly; the content file must not restate
    // or embellish them.
    for (const credential of credentials) {
      expect(source).not.toContain(credential);
    }
    for (const w of ["regulated", "protection", "insured", "bonded", "accredited", "licence"]) {
      expect(allCopy).not.toContain(w);
    }
  });

  it("makes no health, transformation or outcome claim", () => {
    for (const pattern of [
      /\bheals?\b/,
      /\bcure[sd]?\b/,
      /life-changing/,
      /transform your/,
      /\bwellness benefits\b/,
    ]) {
      expect(allCopy).not.toMatch(pattern);
    }
    // The restraint section must actually say this, not merely avoid the words.
    expect(allCopy).toContain("not therapy");
  });

  it("claims no testimonial, partnership, award or affiliation", () => {
    for (const w of ["our partners", "award-winning", "featured in", "as seen"]) {
      expect(allCopy).not.toContain(w);
    }
    // It explains their absence rather than staying quiet about it.
    expect(allCopy).toContain("when there are real ones to publish");
  });

  it("uses no manufactured urgency or scarcity", () => {
    // Phrases, not single words - and this is the third time that distinction has mattered.
    // This page lists "countdowns, limited spots" as things it will NOT
    // do, so a blanket ban on "limited" fails on the very sentence that disclaims it - the
    // same trap the FAQ health check hit with "heal" inside "health claims". On a page whose
    // job is to disclaim, the ban has to target the claim, never the vocabulary. "hurry" was
    // dropped for the same reason: it appears in "nothing here is designed to hurry you".
    const urgency = [
      /only \d+ (spots|places|seats)/,
      /act now/,
      /book (now|today) to/,
      /spaces are limited/,
      /limited time/,
      /don.t miss/,
    ];
    for (const pattern of urgency) {
      expect(allCopy, `must not create urgency: ${pattern}`).not.toMatch(pattern);
    }
    // And the refusal must be stated, not merely implied by absence.
    expect(allCopy).toContain("manufactured urgency");
  });

  it("routes to the guided inquiry", () => {
    expect(about.cta.primary.href).toBe("/begin-planning");
  });

  it("never leaks the internal marker", () => {
    expect(source).not.toContain("INPUT REQUIRED");
  });
});
