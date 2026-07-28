import { test, expect, type Page } from "@playwright/test";

/**
 * Scroll reveals must never be able to hide content.
 *
 * The first implementation faded opacity 0 → 1 on intersection. Two things went wrong and both
 * shipped blank sections: arming the hidden state made copy visibly fade *out* after load, and
 * when the observer missed an element it stayed at opacity 0 forever — measured at three of four
 * reveals still invisible after a full scroll-through. These tests pin the invariant rather than
 * the animation: whatever the reveal does, the content is readable.
 */
async function homepage(page: Page) {
  await page.goto("/");
  // `visible`, not `attached` — see the note in tokens.spec.ts about streamed content being
  // attached inside a hidden template before it is moved into <main>.
  await page.waitForSelector("#final-cta-heading", { state: "visible" });
}

/**
 * Elements a reveal wraps must never be invisible or near-invisible. Deliberate decorative
 * opacity is allowed and expected — FounderFeature dims its HorizonRule to 0.7 by design — so
 * the bar is "readable", not "opaque". A stuck reveal reads 0; a mid-fade reads ~0.05.
 */
async function nearInvisibleCount(page: Page) {
  return page.$$eval(
    "[data-reveal], [data-reveal] *",
    (els) => els.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.5).length
  );
}

/** The reveal wrappers themselves must never carry any opacity of their own. */
async function wrapperOpacities(page: Page) {
  return page.$$eval("[data-reveal]", (els) => els.map((el) => getComputedStyle(el).opacity));
}

test.describe("Scroll reveals never hide content", () => {
  test("revealed content is readable immediately at load", async ({ page }) => {
    await homepage(page);
    expect(await nearInvisibleCount(page)).toBe(0);
    // The reveal never touches opacity, so no wrapper may report anything but 1.
    for (const o of await wrapperOpacities(page)) expect(o).toBe("1");
  });

  test("revealed content stays readable while reveals are mid-flight", async ({ page }) => {
    await homepage(page);
    // Sample across the window where the old opacity fade would have been visible.
    for (let i = 0; i < 12; i++) {
      expect(await nearInvisibleCount(page)).toBe(0);
      await page.waitForTimeout(80);
    }
  });

  test("content settles after a fast scroll that outruns the observer", async ({ page }) => {
    await homepage(page);
    // Jump straight to the bottom in one step — the case that previously left elements hidden.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(7000); // past the component's safety timer

    expect(await nearInvisibleCount(page)).toBe(0);
    // Nothing is left displaced, and nothing is stuck in the pre-reveal state.
    const stuck = await page.$$eval(
      "[data-reveal]",
      (els) =>
        els.filter(
          (el) =>
            el.getAttribute("data-reveal") !== "in" || getComputedStyle(el).transform !== "none"
        ).length
    );
    expect(stuck).toBe(0);
  });

  test("key revealed sections have real rendered height", async ({ page }) => {
    await homepage(page);
    for (const sel of ["#method-heading", "#ecosystem-heading", "#recognition-heading"]) {
      const section = page.locator(`section:has(${sel})`);
      const box = await section.boundingBox();
      expect(box, `${sel} section should render`).not.toBeNull();
      // A section whose reveal swallowed its content collapses to roughly heading + padding.
      expect(box!.height).toBeGreaterThan(320);
    }
  });

  test("reveal markup carries no opacity, so it cannot hide content", async ({ page }) => {
    await homepage(page);
    // Guards the regression at the source: if anyone reintroduces an opacity-based reveal,
    // this fails even when timing happens to make the page look correct.
    const usesOpacity = await page.evaluate(async () => {
      const links = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')];
      for (const link of links) {
        const css = await fetch(link.href).then((r) => r.text());
        for (const m of css.matchAll(/\[data-reveal[^\]]*\][^{]*\{([^}]*)\}/g)) {
          if (/(^|;)\s*opacity\s*:/.test(m[1])) return m[0].slice(0, 120);
        }
      }
      return null;
    });
    expect(usesOpacity, "reveal rules must not set opacity").toBeNull();
  });
});

/*
 * Not covered here: rendering with JavaScript disabled. `src/app/loading.tsx` puts the homepage
 * behind a Suspense boundary, so the served HTML holds the real content in a hidden template and
 * relies on inline scripts to swap it into <main>. With JS off the page shows only "Loading…".
 * That is the app shell, not the reveal system, and it predates this work — recorded as a
 * separate finding rather than asserted here.
 */
