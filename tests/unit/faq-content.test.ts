import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import { credentials, site } from "@/content/site";
import { faqJsonLd } from "@/lib/seo";

const source = readFileSync(path.join(process.cwd(), "src/content/faq.ts"), "utf8");
const allAnswers = faq.groups
  .flatMap((g) => g.items.map((i) => `${i.q} ${i.a}`))
  .join(" ")
  .toLowerCase();

/**
 * An FAQ is the most dangerous page on this site for content safety: its form invites a
 * confident factual answer to anything asked, and §18 forbids inventing most of what an FAQ is
 * normally asked about.
 */
describe("faq content safety", () => {
  it("covers the six areas the Charter names", () => {
    expect(faq.groups.map((g) => g.id)).toEqual([
      "planning",
      "fees",
      "group",
      "wellbeing",
      "community",
      "professional",
    ]);
  });

  it("quotes no fee, price or range", () => {
    expect(source).not.toMatch(/[$£€]\s?\d/);
    expect(source).not.toMatch(/\d[\d,]*\s*[–—-]\s*\d/);
    for (const w of ["per person", "starting at", "deposit", "retainer", "hourly"]) {
      expect(allAnswers).not.toContain(w);
    }
    // It must say plainly that figures are not published, rather than dodging silently.
    expect(allAnswers).toContain("does not publish figures");
  });

  /**
   * §18 lists certifications as uninventable. The three approved strings may appear; what the
   * bodies behind them do, or what they entitle a client to, may not — implying a consumer
   * protection that might not apply would be worse than saying less.
   */
  it("states the credentials verbatim and explains none of them", () => {
    const professional = faq.groups.find((g) => g.id === "professional")!;
    const answer = professional.items.find((i) => i.q.includes("credentials"))!.a;
    expect(answer).toContain(credentials.join(" · "));

    for (const w of [
      "travel industry council",
      "regulated",
      "regulator",
      "protected",
      "protection",
      "insured",
      "bonded",
      "guaranteed",
      "licence",
      "license",
      "accredited",
      "member benefits",
    ]) {
      expect(allAnswers, `must not explain or embellish a credential: ${w}`).not.toContain(w);
    }
  });

  it("makes no health, medical or transformation claim", () => {
    // Word boundaries, not substrings. A blanket ban on the stem "heal" also matches "health
    // claims" - which is the disclaimer this page is supposed to contain. The wellbeing group
    // legitimately uses "health", "clinical" and "therapeutic" precisely in order to deny them,
    // so what is banned here is the claim, never the vocabulary.
    const claims = [
      /\bheals?\b/,
      /\bhealing\b/,
      /\bcure[sd]?\b/,
      /\bdetox/,
      /\bdiagnos/,
      /life-changing/,
      /transform your/,
      /improve your health/,
      /wellness benefits/,
      /\bmedical advice\b/,
    ];
    for (const pattern of claims) {
      expect(allAnswers, `must not claim: ${pattern}`).not.toMatch(pattern);
    }

    // And the denials must actually be there, not merely implied by absence.
    expect(allAnswers).toContain("makes no health claims");
    expect(allAnswers).toContain("clinical or therapeutic");
  });

  it("invents no event history, attendance or scarcity", () => {
    for (const w of [
      "sold out",
      "last spot",
      "limited spaces",
      "our previous",
      "past events",
      "attendees",
      "guests joined",
    ]) {
      expect(allAnswers).not.toContain(w);
    }
    // Community must read as in development, not as running.
    expect(allAnswers).toContain("in development");
  });

  it("invents no destination expertise or supplier relationship", () => {
    for (const w of ["our partners", "preferred", "exclusive", "upgrade", "amenit", "perk"]) {
      expect(allAnswers).not.toContain(w);
    }
  });

  it("uses the approved response time rather than a retyped one", () => {
    expect(allAnswers).toContain(site.inquiryResponseTime.toLowerCase());
  });

  it("builds structured data only from what the page renders", () => {
    const jsonLd = faqJsonLd(faq.groups);
    const count = faq.groups.reduce((n, g) => n + g.items.length, 0);
    expect(jsonLd.mainEntity).toHaveLength(count);
    // Every question in the markup must exist in the rendered content, or the schema is lying.
    // Typed as Set<string> deliberately: `faq` is `as const`, so the inferred Set would be
    // a literal union and `.has(entry.name)` would not typecheck against a plain string.
    const rendered = new Set<string>(faq.groups.flatMap((g) => g.items.map((i) => i.q)));
    for (const entry of jsonLd.mainEntity) {
      expect(rendered.has(entry.name)).toBe(true);
    }
  });

  it("never leaks the internal marker", () => {
    expect(source).not.toContain("INPUT REQUIRED");
  });
});
