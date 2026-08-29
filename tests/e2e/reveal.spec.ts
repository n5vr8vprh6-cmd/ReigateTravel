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

  // This replaces a blanket "no video ships with the page" assertion. That rule came from
  // decision #43, which removed a 6.3MB hero video because it was the only motion running on
  // its own clock. The reasoning still holds for the hero and the hero still has no video - but
  // the client asked for the coastline interlude to play itself, and a band with no copy, no
  // CTA and nothing to read is a reasonable place for that. So the invariant is now specific
  // rather than absolute: no video in the hero, and any video that does ship must be cheap,
  // silent, and must not cost anything until it is actually on screen.
  test("video is confined to the interlude and costs nothing until it is on screen", async ({
    page,
  }) => {
    const media: string[] = [];
    page.on("response", (r) => {
      if (/\.(mp4|webm|mov)(\?|$)/.test(r.url())) media.push(r.url());
    });

    await homepage(page);

    // Nothing fetched on arrival: the clip sits below several screens of content.
    expect(media, "no video may be fetched before it is scrolled to").toEqual([]);

    const heroVideos = await page.locator("section:has(#hero-heading) video").count();
    expect(heroVideos, "the hero carries no video").toBe(0);

    const videos = page.locator("video");
    for (let i = 0; i < (await videos.count()); i++) {
      const v = videos.nth(i);
      // Silent and inline, or a phone will either blare audio or take over the screen.
      await expect(v).toHaveJSProperty("muted", true);
      await expect(v).toHaveAttribute("playsinline", "");
      // A poster means the band is never empty, including where autoplay is refused.
      await expect(v).toHaveAttribute("poster", /.+/);
      // preload="none" is what makes the fetch lazy; `autoplay` would defeat it.
      await expect(v).toHaveAttribute("preload", "none");
      expect(await v.getAttribute("autoplay"), "autoplay would fetch eagerly").toBeNull();
      // Decorative, so it must not be announced or reachable by keyboard.
      await expect(v).toHaveAttribute("aria-hidden", "true");
    }
  });

  test("the interlude clip plays when reached, and not under reduced motion", async ({
    browser,
  }) => {
    for (const reduce of ["no-preference", "reduce"] as const) {
      const ctx = await browser.newContext({ reducedMotion: reduce });
      const page = await ctx.newPage();
      const media: string[] = [];
      page.on("response", (r) => {
        if (/\.mp4(\?|$)/.test(r.url())) media.push(r.url());
      });
      await homepage(page);
      await page.locator("video").first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      const played = await page
        .locator("video")
        .first()
        .evaluate((v: HTMLVideoElement) => ({
          currentTime: v.currentTime,
          paused: v.paused,
        }));

      if (reduce === "reduce") {
        // Never started, so never downloaded. The poster carries the band instead.
        expect(media, "reduced motion must not fetch the clip").toEqual([]);
        expect(played.currentTime, "reduced motion must not play the clip").toBe(0);
      } else {
        expect(media.length, "the clip should load once reached").toBeGreaterThan(0);
        expect(played.currentTime, "the clip should be playing").toBeGreaterThan(0);
      }
      await ctx.close();
    }
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

  // The stairs test above is pinned to one sequence at specific offsets. This one covers every
  // sequence on the page generically, so a newly added strip is exercised without anyone
  // remembering to write a bespoke test for it.
  test("every scroll sequence advances with scroll and is symmetric coming back", async ({
    page,
  }) => {
    await homepage(page);
    // The page sets `scroll-behavior: smooth`, so an un-disabled scrollTo samples mid-animation
    // and reads back garbage. This cost an hour once; disable it before measuring.
    await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });

    const count = await page.locator(".sequence-frame").count();
    expect(count, "expected at least one scroll sequence").toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const frames = Number(
        await page.locator(".sequence-frame").nth(i).getAttribute("data-frames")
      );
      // globals.css only defines steps() for these counts; any other silently does not step.
      expect([20, 24], `sequence ${i} has an unsupported frame count`).toContain(frames);

      const top = await page.evaluate(
        (n) =>
          Math.round(
            document.querySelectorAll(".sequence-frame")[n]!.getBoundingClientRect().top + scrollY
          ),
        i
      );
      const at = async (offset: number) => {
        await page.evaluate((y) => window.scrollTo(0, y), top + offset);
        await page.waitForTimeout(220);
        const t = await page.evaluate(
          (n) => getComputedStyle(document.querySelectorAll(".sequence-strip")[n]!).translate,
          i
        );
        if (t === "none") return 0;
        const pct = parseFloat(t.trim().split(/\s+/)[1] ?? "0");
        return Math.round(-pct / (100 / frames));
      };

      const offsets = [-700, -400, -100, 200];
      const down: number[] = [];
      for (const o of offsets) down.push(await at(o));
      const up: number[] = [];
      for (const o of [...offsets].reverse()) up.push(await at(o));

      expect(new Set(down).size, `sequence ${i} never advanced`).toBeGreaterThan(1);
      expect(down[0]!, `sequence ${i} ran backwards`).toBeLessThan(down[down.length - 1]!);
      // The whole reason for a scroll timeline over a playhead: position determines the frame,
      // so the same scroll position must give the same frame in either direction.
      expect(up.reverse(), `sequence ${i} was not symmetric`).toEqual(down);
    }
  });

  /**
   * Sprite strips are desktop-only, and not for taste reasons. A 24-frame strip is roughly
   * 1:30, which at 390px wide renders as a ~10,000px-tall layer — past the 4096-8192px texture
   * limit common on mobile GPUs, where the browser falls back to software rasterisation and the
   * scroll goes choppy. next/image cannot serve it sensibly either: a full-resolution resize
   * would be 36,000px tall, so it clamps, and a DPR-3 phone was measured receiving a 166px-wide
   * image to fill 390 CSS px.
   *
   * Below lg the frame-0 still renders instead and the strip is never downloaded.
   */
  test("phones get the still, never the sprite strip", async ({ browser }) => {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    const stripRequests: string[] = [];
    page.on("response", (r) => {
      if (/(stairs|sailboat)-sequence/.test(r.url())) stripRequests.push(r.url());
    });

    await homepage(page);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
    });
    await page.waitForTimeout(1500);

    const visibleStrips = await page.evaluate(
      () =>
        [...document.querySelectorAll(".sequence-frame")].filter((e) => e.checkVisibility()).length
    );
    expect(visibleStrips, "no sprite strip may render on a phone").toBe(0);
    expect(stripRequests, "a phone must not download a sprite strip").toEqual([]);

    // And the visitor still sees the photograph rather than an empty band.
    const stills = await page.evaluate(
      () =>
        [...document.querySelectorAll("img")].filter(
          (i) => i.checkVisibility() && /arched-doorway|oakville-horizon/.test(i.currentSrc)
        ).length
    );
    expect(stills, "the frame-0 stills should render in their place").toBeGreaterThan(0);

    await ctx.close();
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
 * Rendering with JavaScript disabled is covered in `no-js.spec.ts`. It used to be a known
 * gap here: `src/app/loading.tsx` put every route behind a Suspense boundary, so with JS off
 * the page showed only "Loading…". That file has been removed and the behaviour is now
 * asserted rather than noted.
 */
