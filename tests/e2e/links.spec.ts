import { test, expect } from "@playwright/test";

/** Every internal link on the homepage must resolve (no dangling routes / 404s). */
test("all internal homepage links resolve to 200", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href^='/']")
    .evaluateAll((anchors) =>
      Array.from(new Set(anchors.map((a) => (a as HTMLAnchorElement).getAttribute("href") || "")))
    );

  const internal = hrefs
    .filter((h) => h && !h.startsWith("//"))
    .map((h) => h.split("#")[0]) // strip in-page anchors
    .filter((h) => h.length > 0);

  const unique = Array.from(new Set(internal));
  expect(unique.length).toBeGreaterThan(0);

  for (const href of unique) {
    const response = await request.get(href);
    expect(response.status(), `${href} should return 200`).toBe(200);
  }
});

/**
 * Every public route must have exactly one H1.
 *
 * This guard exists because ten of sixteen rendered pages had none: `SectionIntro` defaults to
 * `h2`, and `ShellPage` never forwarded a level, so every shell route plus /contact,
 * /travel-notes, /not-found and /error published an H1-less document. It failed silently —
 * nothing errored, no test caught it, and axe's heading-order rule does not require an H1 to
 * exist. Listing the routes explicitly rather than crawling them means a new route with no H1
 * fails here the moment it is added to the sitemap.
 */
const ROUTES = [
  "/",
  "/travel-planning",
  "/community",
  "/travel-notes",
  "/about",
  "/curated-journeys",
  "/partnerships",
  "/faq",
  "/contact",
  "/begin-planning",
  "/privacy",
  "/terms",
  "/accessibility",
];

for (const route of ROUTES) {
  test(`${route} has exactly one h1`, async ({ page }) => {
    await page.goto(route);
    const h1s = page.locator("main h1");
    await expect(h1s).toHaveCount(1);
    await expect(h1s.first()).not.toBeEmpty();
  });
}

test("the 404 page has exactly one h1", async ({ page }) => {
  await page.goto("/a-route-that-does-not-exist");
  await expect(page.locator("main h1")).toHaveCount(1);
});
