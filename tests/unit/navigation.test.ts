import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { primaryNav, footerNav, legalNav } from "@/content/navigation";

/**
 * The sitemap spreads the nav arrays. That coupling is invisible and fails silently: split a
 * nav array without wiring the new one into `src/app/sitemap.ts` and those routes vanish from
 * the sitemap with no error, no failing test and nothing visible on the page.
 *
 * This asserts the relationship rather than a hardcoded list, so a future fifth nav array that
 * nobody wires up fails here instead of shipping.
 */
describe("navigation and sitemap stay in sync", () => {
  const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);

  const allNavHrefs = [
    ...primaryNav.map((i) => i.href),
    ...footerNav.map((i) => i.href),
    ...legalNav.map((i) => i.href),
    "/",
    "/begin-planning",
  ];

  it.each(allNavHrefs)("includes %s", (href) => {
    expect(sitemapPaths).toContain(href);
  });

  it("lists every route exactly once", () => {
    expect(new Set(sitemapPaths).size).toBe(sitemapPaths.length);
  });

  it("keeps the three legal routes out of the utility list", () => {
    const utilityHrefs = footerNav.map((i) => i.href);
    for (const href of ["/privacy", "/terms", "/accessibility"]) {
      expect(utilityHrefs).not.toContain(href);
      expect(legalNav.map((i) => i.href)).toContain(href);
    }
  });
});
