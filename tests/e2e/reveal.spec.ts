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
        for (const m of css.matchAll(
          /@keyframes\s+(rise-in|image-parallax|hero-zoom|cta-converge|stage-rise|interlude-drift)\s*\{/g
        )) {
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

  // The Method is the page's one pinned moment. Pinning is a progressive enhancement: the five
  // stages must be present, readable and in order whether or not it engages. A stranded pinned
  // section is far worse than a missing effect, and this project has already shipped a reveal
  // that left content invisible once.
  test("the pinned Method sequence still presents all five stages, in order", async ({ page }) => {
    await homepage(page);
    const names = await page.$$eval(".method-stage h3", (els) =>
      els.map((el) => el.textContent?.trim())
    );
    expect(names).toEqual(["Listen", "Define", "Curate", "Support", "Remember"]);

    // Every stage has real rendered size — a collapsed sticky track would zero these.
    const heights = await page.$$eval(".method-stage", (els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().height))
    );
    expect(heights.every((h) => h > 40)).toBe(true);
  });

  test("Method stages are never invisible, only offset", async ({ page }) => {
    await homepage(page);
    const opacities = await page.$$eval(".method-stage, .method-stage *", (els) =>
      els.map((el) => parseFloat(getComputedStyle(el).opacity))
    );
    expect(opacities.every((o) => o >= 0.5)).toBe(true);
  });

  test("under reduced motion the Method is static flow, not a sticky track", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await homepage(page);

    const state = await page.evaluate(() => {
      const track = document.querySelector<HTMLElement>(".method-track")!;
      const frame = document.querySelector<HTMLElement>(".method-frame")!;
      return {
        framePosition: getComputedStyle(frame).position,
        // A 220vh track would dwarf the viewport; static flow should be far shorter.
        trackVh: track.getBoundingClientRect().height / window.innerHeight,
        stageOffsets: [...document.querySelectorAll(".method-stage")].map((el) => {
          const t = getComputedStyle(el).translate;
          return t === "none" ? 0 : parseFloat(t.trim().split(/\s+/)[1] ?? "0");
        }),
      };
    });

    expect(state.framePosition).not.toBe("sticky");
    expect(state.trackVh).toBeLessThan(2);
    expect(state.stageOffsets.every((v) => Math.abs(v) < 0.5)).toBe(true);
    await ctx.close();
  });

  // Read the `scale` PROPERTY, not `transform`. The thread animates `scale`, so
  // `DOMMatrix(getComputedStyle(el).transform)` returns identity and every reading looks
  // like 1 — which is exactly how this was first mis-measured.
  const scaleY = (raw: string) => {
    if (raw === "none") return 1;
    const parts = raw.trim().split(/\s+/);
    return parseFloat(parts[1] ?? parts[0]);
  };

  test("the journey thread is fully drawn under reduced motion, never half-drawn", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await homepage(page);
    const scales = await page.$$eval(".journey-thread", (els) =>
      els.map((el) => getComputedStyle(el).scale)
    );
    expect(scales.length).toBeGreaterThan(3);
    // A partially drawn line implies broken progress, so reduced motion must land on 1, not 0.
    for (const raw of scales) expect(scaleY(raw)).toBeCloseTo(1, 2);
    await ctx.close();
  });

  test("hero copy layers are never displaced at the top of the page", async ({ page }) => {
    await homepage(page);
    // The separation is an exit effect: at scroll 0 every layer must be exactly in place,
    // otherwise the first thing a visitor sees is a misaligned composition.
    const offsets = await page.$$eval(".hero-layer", (els) =>
      els.map((el) => {
        const t = getComputedStyle(el).translate;
        return t === "none" ? 0 : parseFloat(t.trim().split(/\s+/)[1] ?? "0");
      })
    );
    expect(offsets.length).toBe(4);
    for (const v of offsets) expect(Math.abs(v)).toBeLessThan(0.5);
  });

  test("no video ships with the page", async ({ page }) => {
    const media: string[] = [];
    page.on("response", (r) => {
      if (/\.(mp4|webm|mov)(\?|$)/.test(r.url())) media.push(r.url());
    });
    await homepage(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    expect(media, "the hero video was removed so every motion answers to scroll").toEqual([]);
    expect(await page.locator("video").count()).toBe(0);
  });

  // The scroll-scrubbed sequence in the Reigate story section. `translate` here is a
  // PERCENTAGE of the strip's own height — one frame is 100/24. Reading it as pixels makes
  // every frame look like 0, which is exactly how this was first mis-measured.
  const frameIndex = (translate: string, frames = 24) => {
    if (translate === "none") return 0;
    const pct = parseFloat(translate.trim().split(/\s+/)[1] ?? "0");
    return Math.round(-pct / (100 / frames));
  };

  test("the stairs sequence steps through frames as the page scrolls", async ({ page }) => {
    await homepage(page);
    await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
    const top = await page.evaluate(() =>
      Math.round(
        document.querySelector(".sequence-frame")!.getBoundingClientRect().top + window.scrollY
      )
    );
    const read = async (y: number) => {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(380);
      return frameIndex(
        await page.$eval(".sequence-strip", (el) => getComputedStyle(el).translate)
      );
    };

    const down = [await read(top - 950), await read(top - 450), await read(top + 250)];
    // Frames must actually advance, not sit on one.
    expect(new Set(down).size).toBeGreaterThan(1);
    expect(down[0]).toBeLessThan(down[2]);

    // ...and walk back up symmetrically, because the animation is a function of position.
    expect(await read(top - 450)).toBe(down[1]);
    expect(await read(top - 950)).toBe(down[0]);
  });

  test("the stairs sequence rests on a whole frame, never mid-stride", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await homepage(page);
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(400);
    const t = await page.$eval(".sequence-strip", (el) => getComputedStyle(el).translate);
    // Without the animation the strip must sit exactly on frame 0 — a partial offset would
    // show two half-frames stitched together.
    expect(t === "none" || parseFloat(t.trim().split(/\s+/)[1] ?? "0") === 0).toBe(true);
    await ctx.close();
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
