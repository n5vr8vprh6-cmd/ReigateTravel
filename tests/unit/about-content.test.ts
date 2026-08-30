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
 * Tyler, and Tyler is the subject.
 *
 * These tests were originally written to keep a gap a gap: the biography beyond the two
 * approved paragraphs was missing-inputs #8, and the risk was that someone would fill the
 * silence with plausible invention. The client has since supplied "Meet Tyler", so the gap is
 * closed and the risk has moved rather than disappeared — the danger now is that approved
 * words get tidied, shortened or blended into the derived copy around them. The bans below
 * still apply to every word on the page, including hers.
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
    // This used to also assert the page said "not therapy" out loud, because avoiding a claim
    // and disclaiming it are different things and the second is stronger. That sentence lived in
    // "What you will not find here", removed at client direction (source-conflicts #12). The ban
    // survives; the disclosure does not. Recorded rather than quietly deleted, because the
    // difference is exactly what the assertion existed to hold.
  });

  it("claims no testimonial, partnership, award or affiliation", () => {
    for (const w of ["our partners", "award-winning", "featured in", "as seen"]) {
      expect(allCopy).not.toContain(w);
    }
    // The page no longer explains the absence — "There will be some when there are real ones to
    // publish" went with the restraint section (source-conflicts #12). Silence about testimonials
    // is now indistinguishable from having none, which is true but says less.
  });

  it("uses no manufactured urgency or scarcity", () => {
    // Phrases, not single words - and this is the third time that distinction has mattered.
    // The page used to list "countdowns, limited spots" as things it would NOT do, so a blanket
    // ban on "limited" failed on the very sentence that disclaimed it - the same trap the FAQ
    // health check hit with "heal" inside "health claims". That sentence is gone now, but the
    // patterns stay phrase-shaped on purpose: the lesson is that a ban must target the claim
    // rather than the vocabulary, and the next disclaimer written here would hit it again.
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
    // The stated refusal went with the restraint section (source-conflicts #12), so absence is
    // now all there is. The phrase list below is the whole guard.
  });

  it("carries Tyler's supplied biography, and carries it whole", () => {
    // Six paragraphs as supplied. A shorter array means someone trimmed her words, which is
    // the specific failure this guards: §18's protection is about her voice, not just about
    // avoiding invented facts.
    expect(about.meetTyler.body).toHaveLength(6);
    for (const paragraph of about.meetTyler.body) {
      expect(paragraph.length, "no paragraph may be reduced to a fragment").toBeGreaterThan(120);
    }
    // The founding sentence and the closing idea are the two most quotable lines in the
    // document and the likeliest to be "improved". Pinned verbatim.
    expect(about.meetTyler.body[0]).toContain(
      "a lifestyle and wellness travel company created for people who want more from travel than simply getting away"
    );
    expect(about.meetTyler.body[5]).toContain(
      "travel should leave you feeling more connected, more inspired, and a little more yourself than when you left"
    );
  });

  it("routes to the guided inquiry", () => {
    expect(about.cta.primary.href).toBe("/begin-planning");
  });

  it("never leaks the internal marker", () => {
    expect(source).not.toContain("INPUT REQUIRED");
  });
});
