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
