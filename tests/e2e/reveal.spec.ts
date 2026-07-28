import { test, expect, type Page } from "@playwright/test";

/**
 * Scroll motion must never be able to hide or strand content.
 *
 * History this pins down. The first implementation was an IntersectionObserver component
 * that faded opacity 0 → 1. Two things went wrong and both shipped blank sections: arming
 * the hidden state made copy visibly fade *out* after load, and when the observer missed an
 * element it stayed at opacity 0 permanently — measured at three of four reveals still
 * invisible after a full scroll-through. It is now CSS scroll-driven animation with no
 * JavaScript, which removes the event that could be missed.
 *
 * The invariants below are about the *outcome*, not the technique, so they survive another
 * change of mechanism: content is readable, nothing is stranded off-position, and nothing
 * depends on an animation having run.
 */
async function homepage(page: Page) {
  await page.goto("/");
  // `visible`, not `attached` — streamed content is attached inside a hidden template
  // before the inline scripts move it into <main>.
  await page.waitForSelector("#final-cta-heading", { state: "visible" });
}

const ANIMATED = ".reveal, .reveal-stagger > *, .editorial-image img, .hero-drift";

/** Nothing an animation touches may be invisible or near-invisible. */
async function nearInvisibleCount(page: Page) {
  return page.$$eval(
    `${ANIMATED}, .reveal *`,
    (els) => els.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.5).length
  );
}

test.describe("Scroll motion never hides content", () => {
  test("animated content is readable at load", async ({ page }) => {
    await homepage(page);
    expect(await nearInvisibleCount(page)).toBe(0);
  });

  test("animated content stays readable while animations are in flight", async ({ page }) => {
    await homepage(page);
    for (let i = 0; i < 10; i++) {
      expect(await nearInvisibleCount(page)).toBe(0);
      await page.waitForTimeout(80);
    }
  });

  test("no scroll animation drives opacity", async ({ page }) => {
    await homepage(page);
    // The regression guard: if anyone reintroduces an opacity-based reveal, this fails even
    // when timing happens to make the page look correct in a screenshot.
    const offender = await page.evaluate(async () => {
      const links = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')];
      for (const link of links) {
        const css = await fetch(link.href).then((r) => r.text());
        for (const m of css.matchAll(/@keyframes\s+(rise-in|image-parallax|hero-zoom)\s*\{/g)) {
          // Grab the keyframe body and check it never touches opacity.
          const start = m.index! + m[0].length;
          let depth = 1;
          let i = start;
          while (i < css.length && depth > 0) {
            if (css[i] === "{") depth++;
            else if (css[i] === "}") depth--;
            i++;
          }
          const body = css.slice(start, i);
          if (/(^|[;{\s])opacity\s*:/.test(body)) return `${m[1]}: ${body.slice(0, 100)}`;
        }
      }
      return null;
    });
    expect(offender, "scroll keyframes must not animate opacity").toBeNull();
  });

  test("content settles after a fast scroll to the bottom", async ({ page }) => {
    await homepage(page);
    // Scroll-linked animation is a function of position, so a single jump cannot strand it
    // the way a missed observer callback could.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(900);

    expect(await nearInvisibleCount(page)).toBe(0);
    const stranded = await page.$$eval(
      ".reveal, .reveal-stagger > *",
      (els) =>
        els.filter((el) => {
          const t = getComputedStyle(el).translate;
          // Settled is "none" or a zero offset; anything else means it was left displaced.
          return t !== "none" && !/^0px(\s+0px)?$/.test(t.trim());
        }).length
    );
    expect(stranded).toBe(0);
  });

  test("key animated sections have real rendered height", async ({ page }) => {
    await homepage(page);
    for (const sel of ["#method-heading", "#ecosystem-heading", "#recognition-heading"]) {
      const section = page.locator(`section:has(${sel})`);
      const box = await section.boundingBox();
      expect(box, `${sel} section should render`).not.toBeNull();
      expect(box!.height).toBeGreaterThan(320);
    }
  });

  test("reduced motion leaves everything settled and readable", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await homepage(page);
    expect(await nearInvisibleCount(page)).toBe(0);
    const moved = await page.$$eval(
      ".reveal, .reveal-stagger > *",
      (els) =>
        els.filter((el) => {
          const t = getComputedStyle(el).translate;
          return t !== "none" && !/^0px(\s+0px)?$/.test(t.trim());
        }).length
    );
    expect(moved, "nothing may be displaced under reduced motion").toBe(0);
    await ctx.close();
  });
});

/*
 * Not covered here: rendering with JavaScript disabled. `src/app/loading.tsx` puts the
 * homepage behind a Suspense boundary, so the served HTML holds the real content in a hidden
 * template and relies on inline scripts to swap it into <main>. With JS off the page shows
 * only "Loading…". That is the app shell, not the motion system, and it predates this work —
 * recorded as finding T1 in docs/decisions/missing-inputs.md.
 */
