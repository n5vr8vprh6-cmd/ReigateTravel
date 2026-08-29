import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { travelPlanning as tp } from "@/content/travel-planning";

const source = readFileSync(path.join(process.cwd(), "src/content/travel-planning.ts"), "utf8");
const allCopy = JSON.stringify(tp).toLowerCase();

/**
 * This page is where invented facts would be most tempting and most damaging: it exists to
 * convert, so every absent proof point is a gap something could fill. Charter §18 forbids
 * inventing destination expertise, supplier relationships, partnerships, prices, volume, awards
 * and testimonials, and none of those has been supplied.
 */
describe("travel-planning content safety", () => {
  it("states no fee, price or investment range", () => {
    // missing-inputs #3: ranges are Tyler's to finalise and are still outstanding.
    expect(source).not.toMatch(/[$£€]\s?\d/);
    expect(source).not.toMatch(/\d[\d,]*\s*[–—-]\s*\d/);
    for (const word of ["per person", "starting at", "from just", "deposit", "retainer"]) {
      expect(allCopy).not.toContain(word);
    }
  });

  it("claims no supplier, partner or industry relationship", () => {
    for (const word of [
      "partner with",
      "our partners",
      "preferred",
      "exclusive",
      "upgrade",
      "amenit",
      "perk",
      "vip",
    ]) {
      expect(allCopy).not.toContain(word);
    }
  });

  it("claims no volume, track record or testimonial", () => {
    for (const word of [
      "years of",
      "clients have",
      "hundreds",
      "thousands",
      "trusted by",
      "award",
    ]) {
      expect(allCopy).not.toContain(word);
    }
    // A number followed by a countable noun is how a volume claim usually reads.
    expect(allCopy).not.toMatch(/\d+\s*(trips|clients|countries|journeys|years)/);
  });

  it("promises no outcome it cannot control", () => {
    for (const word of ["guarantee", "best price", "cheapest", "flawless", "perfect trip"]) {
      expect(allCopy).not.toContain(word);
    }
  });

  it("keeps offer status accurate: Bespoke current, the other two in development", () => {
    expect(allCopy).toContain("bespoke travel planning is the service operating now");
    expect(allCopy).toContain("in development");
    // Neither in-development offer may be presented as bookable from this page.
    expect(allCopy).toContain("neither is bookable yet");
  });

  it("routes to the guided inquiry, which is the page's stated purpose", () => {
    expect(tp.cta.primary.href).toBe("/begin-planning");
  });

  it("covers the Charter's content items for this page", () => {
    // §8 page 2: who it is for, what Reigate helps with, why planning matters, the Method,
    // service boundaries, investment context, questions, and the inquiry CTA.
    for (const key of [
      "audience",
      "helpsWith",
      "whyAdvisor",
      "method",
      "scope",
      "investment",
      "questions",
      "cta",
    ] as const) {
      expect(tp[key], `missing Charter content item: ${key}`).toBeTruthy();
    }
  });

  it("never leaks the internal marker", () => {
    expect(source).not.toContain("INPUT REQUIRED");
  });
});
