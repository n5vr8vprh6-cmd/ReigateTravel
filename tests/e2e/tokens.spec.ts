import { test, expect, type Page } from "@playwright/test";

/**
 * The document streams `loading.tsx` inside <main> first and swaps in the real sections after.
 * Querying with $eval straight after goto() therefore races the stream — it can measure the
 * loading fallback instead of the page. Always wait for the last section to exist.
 */
async function gotoHome(page: Page) {
  await page.goto("/");
  // `visible`, not `attached`: streamed content is attached inside a hidden template before the
  // inline scripts move it into <main>, so `attached` resolves while <main> still holds only the
  // loading fallback — and every measurement then reads the wrong element.
  await page.waitForSelector("#final-cta-heading", { state: "visible" });
}

/**
 * Design tokens are consumed through Tailwind arbitrary values. In Tailwind v4 a bare
 * custom-property name inside square brackets is a *literal* arbitrary value: it compiles to
 * a declaration whose value is the property name rather than its value, which is invalid CSS
 * and is silently dropped. Nothing errors, nothing warns — the token stops applying.
 *
 * That defect shipped and survived a full visual review: every section rendered with 0px
 * padding, the content-width cap never applied, the header collapsed to content height, and
 * button transitions were 0s. These tests assert the *computed* result, which is the only way
 * this class of bug is visible.
 *
 * NOTE: do not write the broken form literally anywhere in the repo, including comments and
 * docs. Tailwind v4 scans all non-ignored source — a comment demonstrating the bug generates
 * the dead utility and trips the last test in this file. That is how it was first caught.
 */
test.describe("Design tokens resolve to real computed values", () => {
  test("section vertical rhythm is applied to every banded section", async ({ page }) => {
    await gotoHome(page);
    // Two sections are deliberately built from primitives rather than <Section> because they
    // are full-bleed compositions with no band padding above the image: the hero, and the
    // community break. Everything else must carry the token.
    const EXEMPT = ["hero-heading", "community-heading"];
    const paddings = await page.$$eval(
      "main section",
      (els, exempt) =>
        els
          .filter((el) => !exempt.includes(el.getAttribute("aria-labelledby") ?? ""))
          .map((el) => ({
            label: el.getAttribute("aria-labelledby") ?? el.getAttribute("aria-label") ?? "?",
            top: parseFloat(getComputedStyle(el).paddingTop),
            bottom: parseFloat(getComputedStyle(el).paddingBottom),
          })),
      EXEMPT
    );

    expect(paddings.length).toBeGreaterThan(7);
    for (const p of paddings) {
      expect(p.top, `${p.label} padding-top`).toBeGreaterThan(40);
      expect(p.bottom, `${p.label} padding-bottom`).toBeGreaterThan(40);
    }
    // And the exemptions must actually exist — otherwise this test quietly stops covering them.
    const exemptFound = await page.$$eval(
      "main section",
      (els, exempt) =>
        els.filter((el) => exempt.includes(el.getAttribute("aria-labelledby") ?? "")).length,
      EXEMPT
    );
    expect(exemptFound).toBe(EXEMPT.length);
  });

  test("container max-width caps content below the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHome(page);
    const maxW = await page.$eval("#what-is-reigate > div", (el) =>
      parseFloat(getComputedStyle(el).maxWidth)
    );
    // 72rem = 1152px. The failure mode was `none`, which parses to NaN.
    expect(Number.isNaN(maxW)).toBe(false);
    expect(maxW).toBeCloseTo(1152, 0);
  });

  test("header height token applies and matches the mobile nav offset", async ({ page }) => {
    await gotoHome(page);
    const headerH = await page.$eval("header > div", (el) =>
      parseFloat(getComputedStyle(el).height)
    );
    expect(headerH).toBeCloseTo(72, 0);
  });

  test("button and link transitions use the motion tokens", async ({ page }) => {
    await gotoHome(page);
    // Keyed off the section rather than the hero's internal nesting — the previous selector
    // (`#hero-heading ~ div a`) broke the moment the hero was restructured into layers.
    const btn = await page.$eval("section:has(#hero-heading) a[class*='min-h']", (el) => {
      const cs = getComputedStyle(el);
      return { duration: cs.transitionDuration, timing: cs.transitionTimingFunction };
    });
    expect(btn.duration).not.toBe("0s");
    expect(btn.timing).toContain("cubic-bezier");
  });

  test("no Tailwind arbitrary value uses the bare custom-property form", async ({ page }) => {
    await gotoHome(page);
    // Pull every stylesheet the page loaded and look for the broken pattern:
    // a declaration whose value is a bare `--token` rather than `var(--token)`.
    const offenders = await page.evaluate(async () => {
      // Properties whose grammar genuinely accepts a bare <dashed-ident>. For these a
      // `--name` value is correct and must not be flagged — unlike padding/width/colour,
      // where a bare custom-property name is the silent-failure bug this test exists for.
      const DASHED_IDENT_OK = new Set([
        "animation-timeline",
        "view-timeline-name",
        "view-timeline",
        "scroll-timeline-name",
        "scroll-timeline",
        "timeline-scope",
        "anchor-name",
        "position-anchor",
        "anchor-scope",
      ]);
      const links = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')];
      const found: string[] = [];
      for (const link of links) {
        const css = await fetch(link.href).then((r) => r.text());
        for (const m of css.matchAll(/([a-z-]+)\s*:\s*(--[a-zA-Z0-9-]+)\s*[;}]/g)) {
          // Custom-property *definitions* (--x: --y) are legal; declarations are not.
          if (!m[1].startsWith("--") && !DASHED_IDENT_OK.has(m[1])) found.push(`${m[1]}: ${m[2]}`);
        }
      }
      return [...new Set(found)];
    });
    expect(offenders).toEqual([]);
  });
});
