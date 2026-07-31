import { test, expect } from "@playwright/test";

test.describe("Homepage — narrative + conversions", () => {
  test("has one H1 with the locked brand idea", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Travel is part of living well.");
  });

  test("hero shows both CTAs with Begin Planning primary", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section", { hasText: "Travel is part of living well." }).first();
    await expect(hero.getByRole("link", { name: "Begin Planning" })).toBeVisible();
    await expect(hero.getByRole("link", { name: /Explore Reigate/ })).toBeVisible();
  });

  test("communicates offer status: Bespoke available, two in development", async ({ page }) => {
    await page.goto("/");
    // The status chips were removed at the client's direction (decision-log #31), so the
    // page now carries this in prose instead. That sentence is load-bearing: it is the only
    // place a visitor is told the other two offers are not yet bookable. If it is ever
    // edited away, this fails — which is the point.
    await expect(
      page.getByText(
        /Bespoke Travel Planning is available now\. Community Experiences and Curated Wellness Journeys are in development/
      )
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Bespoke Travel Planning" }).first()
    ).toBeVisible();
  });

  test("in-development offers stay visually subordinate to the current offer", async ({ page }) => {
    await page.goto("/");
    const ecosystem = page.locator("section:has(#ecosystem-heading)");
    // The current offer is the only one carrying photography in the ecosystem grid.
    await expect(ecosystem.locator("article img")).toHaveCount(1);
    await expect(ecosystem.locator("article")).toHaveCount(3);
  });

  test("renders the five Reigate Method stages in order", async ({ page }) => {
    await page.goto("/");
    const stages = page.locator("ol li h3");
    await expect(stages).toHaveText(["Listen", "Define", "Curate", "Support", "Remember"]);
  });

  test("final CTA uses the approved heading and both actions", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Begin with how you want the journey to feel." })
    ).toBeVisible();
    const finalSection = page.locator("section", {
      hasText: "Begin with how you want the journey to feel.",
    });
    await expect(finalSection.getByRole("link", { name: "Begin Planning" })).toBeVisible();
    await expect(finalSection.getByRole("link", { name: "Join the Community" })).toBeVisible();
  });

  test("does not leak the internal INPUT REQUIRED marker", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).not.toContainText("INPUT REQUIRED");
  });
});

test.describe("Mobile navigation (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens and closes the menu by keyboard", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /Open menu/ });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.getByRole("button", { name: /Close menu/ })).toBeVisible();
    const panel = page.locator("#mobile-nav-panel");
    await expect(panel.getByRole("link", { name: "Travel Planning" })).toBeVisible();
    // Escape closes and returns focus to the toggle.
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav-panel")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Open menu/ })).toBeFocused();
  });
});
