import { test, expect, type Browser } from "@playwright/test";
import { inquirySteps } from "@/content/inquiry";

/**
 * Rendering with JavaScript disabled.
 *
 * This was finding T1 for most of the project's life: `src/app/loading.tsx` put every route
 * behind a Suspense boundary, so the served HTML kept the real content in a hidden template and
 * relied on inline scripts to move it into `<main>`. With JavaScript off, both the homepage and
 * the site's primary conversion rendered the word "Loading…" and nothing else.
 *
 * The boundary was inert — no route fetches anything, and all of them are statically
 * prerendered — so deleting that one file resolved it. These tests exist so it cannot come back
 * quietly: a future `loading.tsx`, or a page that starts awaiting something, fails here rather
 * than shipping an invisible form.
 */
async function noJsPage(browser: Browser) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  return { context, page: await context.newPage() };
}

test("the homepage renders its content without JavaScript", async ({ browser }) => {
  const { context, page } = await noJsPage(browser);
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const text = await page.evaluate(() => document.body.innerText);
  expect(text).not.toContain("Loading");
  // A real page, not a shell: the hero, the pinned Method and the closing CTA are all present.
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#final-cta-heading")).toBeVisible();
  await expect(page.locator(".method-stage").first()).toBeVisible();
  expect(text.length).toBeGreaterThan(2000);

  await context.close();
});

test("the guided inquiry is usable without JavaScript", async ({ browser }) => {
  const { context, page } = await noJsPage(browser);
  await page.goto("/begin-planning", { waitUntil: "domcontentloaded" });

  const text = await page.evaluate(() => document.body.innerText);
  expect(text).not.toContain("Loading");
  await expect(page.locator("h1")).toBeVisible();

  const hasForm = (await page.locator("form").count()) > 0;
  test.skip(!hasForm, "built without delivery env vars; form not rendered");

  // Unenhanced means every step is visible at once and there is a single submit button —
  // one long form that works, rather than a stepper with dead controls.
  //
  // Counted from the registry rather than written as a literal. The literal was `6`, and when
  // the inquiry was split into a short brief plus a pre-call form this assertion was one of the
  // things that had to be found and edited by hand. Deriving it means the shape of the form can
  // change without this test making a false claim about it.
  await expect(page.locator("form section")).toHaveCount(inquirySteps.length);
  for (let i = 0; i < inquirySteps.length; i++) {
    await expect(page.locator("form section").nth(i)).toBeVisible();
  }
  await expect(page.locator("#f-firstName")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send my inquiry" })).toBeVisible();
  // No step controls exist without JavaScript, so nothing on screen is inoperable.
  await expect(page.getByRole("button", { name: "Continue" })).toHaveCount(0);

  await context.close();
});
