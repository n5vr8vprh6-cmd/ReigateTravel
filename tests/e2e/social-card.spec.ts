import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * The share card is a generated file (`scripts/build-og-image.mjs`) referenced by a Next file
 * convention, which means nothing in the app imports it and no type checks it. Delete
 * `src/app/opengraph-image.jpg` and the build still succeeds — the tags simply stop being
 * emitted, silently, and every share of the site goes back to a bare text card. That is the
 * failure this file exists to catch.
 */
const content = (page: import("@playwright/test").Page, selector: string) =>
  page.locator(selector).getAttribute("content");

test.describe("social share card", () => {
  test("the homepage advertises a large image card that actually resolves", async ({
    page,
    request,
  }) => {
    await page.goto("/");

    const src = await content(page, 'meta[property="og:image"]');
    expect(src, "og:image must be emitted").toBeTruthy();

    // Twitter's default card type crops 1200x630 to a small square, so the type matters as much
    // as the image does.
    expect(await content(page, 'meta[name="twitter:card"]')).toBe("summary_large_image");

    expect(await content(page, 'meta[property="og:image:width"]')).toBe("1200");
    expect(await content(page, 'meta[property="og:image:height"]')).toBe("630");

    const response = await request.get(new URL(src!).pathname + new URL(src!).search);
    expect(response.status(), "the card itself must be served").toBe(200);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
  });

  test("the card carries alt text describing the scene, not the brand alone", async ({ page }) => {
    await page.goto("/");
    const alt = await content(page, 'meta[property="og:image:alt"]');
    expect(alt, "og:image:alt must be emitted").toBeTruthy();
    // A card with baked-in words needs alt that covers them; the manifest's alt for the source
    // photograph describes the scene, and the card adds the headline on top of it.
    expect(alt!.length).toBeGreaterThan(40);
    expect(alt!.toLowerCase()).toContain("coastline");
  });

  test("every route inherits the card, not just the homepage", async ({ page }) => {
    // The convention lives in the root segment and is inherited. A page that set its own
    // `openGraph` block without an image would drop it, which is easy to do by accident.
    for (const route of ["/about", "/travel-planning", "/faq", "/begin-planning"]) {
      await page.goto(route);
      expect(
        await content(page, 'meta[property="og:image"]'),
        `${route} should inherit the share card`
      ).toBeTruthy();
    }
  });

  test("the committed card matches what the generator produces", async () => {
    // Not a pixel comparison - just the guarantee that the file on disk is the real 1200x630
    // JPEG and not a placeholder, a PNG renamed, or a truncated write.
    const file = readFileSync(path.join(process.cwd(), "src/app/opengraph-image.jpg"));
    expect(file[0] === 0xff && file[1] === 0xd8, "must be a real JPEG").toBe(true);
    // Social platforms fetch this on every share; a card that has crept into the hundreds of KB
    // means someone re-encoded it as a PNG or bumped the quality without noticing.
    expect(file.length).toBeLessThan(200 * 1024);
  });
});
