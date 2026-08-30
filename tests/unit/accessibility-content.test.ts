import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { accessibility } from "@/content/accessibility";

/**
 * The accessibility statement is the one page where an untrue claim does specific harm: someone
 * relying on it has been told they can use this site when perhaps they cannot.
 *
 * The statement's most checkable claim is which pages the automated run covers. Prose cannot be
 * held to that — delete a scan and the sentence quietly becomes a lie — so the routes are data,
 * and this holds them against what `tests/a11y/` actually visits.
 */
const a11yDir = path.join(process.cwd(), "tests/a11y");
const scannedRoutes = new Set(
  readdirSync(a11yDir)
    .filter((f) => f.endsWith(".ts"))
    .flatMap((f) => {
      const src = readFileSync(path.join(a11yDir, f), "utf8");
      return [
        // `page.goto("/x")` and entries in a `pages` table of `path: "/x"`.
        ...[...src.matchAll(/goto\("([^"]+)"\)/g)].map((m) => m[1]),
        ...[...src.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]),
      ];
    })
);

describe("the accessibility statement", () => {
  it("only claims coverage for pages the axe run actually visits", () => {
    for (const route of accessibility.testedRoutes) {
      expect(
        scannedRoutes.has(route.path),
        `the statement lists ${route.path} as covered, but no spec in tests/a11y visits it`
      ).toBe(true);
    }
  });

  it("does not quietly under-claim either", () => {
    // The reverse direction. A route that is scanned but unlisted is a smaller problem than the
    // other way round, but it still means the page is telling visitors less than is true.
    const listed = new Set<string>(accessibility.testedRoutes.map((r) => r.path));
    const unlisted = [...scannedRoutes].filter((r) => r.startsWith("/") && !listed.has(r));
    expect(unlisted, "these routes are scanned but the statement does not mention them").toEqual(
      []
    );
  });

  it("states the standard it is aiming at, and does not claim to have met it outright", () => {
    expect(accessibility.lead).toContain("WCAG 2.2");
    // "aims to meet" rather than "meets" or "is compliant". No audit has been done, and a
    // conformance claim without one is exactly the overstatement this page must not make.
    expect(accessibility.lead.toLowerCase()).toContain("aims to meet");
    const claims = JSON.stringify(accessibility).toLowerCase();
    for (const overclaim of [
      "fully accessible",
      "fully compliant",
      "certified",
      "guarantee",
      "meets all",
    ]) {
      expect(claims, `must not claim "${overclaim}"`).not.toContain(overclaim);
    }
  });

  it("admits the absence of an independent audit, in the limitations section", () => {
    const limitations = accessibility.groups.find((g) => g.id === "limitations");
    expect(
      limitations,
      "a statement without a limitations section is a marketing page"
    ).toBeTruthy();
    expect(JSON.stringify(limitations).toLowerCase()).toContain("independent accessibility audit");
  });

  it("makes no regulatory compliance claim", () => {
    // AODA compliance is a legal determination about the business, not a statement about the
    // website, and it needs a supplied document the way the Privacy Policy did.
    const claims = JSON.stringify(accessibility).toLowerCase();
    for (const term of ["aoda", "ada compliant", "section 508", "en 301 549"]) {
      expect(claims, `must not assert ${term}`).not.toContain(term);
    }
  });

  it("gives a real way to report a barrier", () => {
    const body = accessibility.feedback.body.join(" ");
    expect(body).toContain("@");
    expect(body.length, "a feedback route needs more than a mailto").toBeGreaterThan(200);
  });
});
