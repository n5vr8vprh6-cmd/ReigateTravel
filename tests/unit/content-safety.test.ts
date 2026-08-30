import { describe, it, expect } from "vitest";
import { methodStages } from "@/content/method";
import { featuredArticles } from "@/content/articles";
import { home } from "@/content/home";
import { site } from "@/content/site";

describe("content safety + approved language", () => {
  it("uses the exact Reigate Method stages in order", () => {
    expect(methodStages.map((s) => s.name)).toEqual([
      "Listen",
      "Define",
      "Curate",
      "Support",
      "Remember",
    ]);
  });

  it("ships no fabricated Travel Notes articles", () => {
    expect(featuredArticles).toHaveLength(0);
  });

  it("keeps the locked brand idea and hero language intact", () => {
    expect(site.brandIdea).toBe("Travel is part of living well.");
    expect(home.hero.heading).toBe("Travel is part of living well.");
    expect(home.hero.primaryCta.label).toBe("Begin Planning");
    // Repointed, not removed. "Explore Reigate" was [A] in three governing sources and this
    // guard is what made changing it a deliberate act rather than a typo. The new string is
    // pinned for the same reason — the point of the guard is that hero copy cannot drift
    // silently, not that it can never change. See source-conflicts.md #9.
    expect(home.hero.secondaryCta.label).toBe("How Planning Works");
    expect(home.hero.secondaryCta.href).toBe("/travel-planning");
  });

  it("never exposes the internal INPUT REQUIRED marker in homepage copy", () => {
    const serialized = JSON.stringify(home);
    expect(serialized).not.toMatch(/INPUT REQUIRED/i);
  });
});
