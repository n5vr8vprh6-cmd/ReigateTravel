import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const widths = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

async function scan(page: import("@playwright/test").Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const serious = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical"
  );
  if (serious.length) {
    console.log(
      `Violations ${label}:`,
      serious.map((v) => `${v.id} (${v.impact}) — ${v.nodes.length} node(s)`).join("\n")
    );
  }
  expect(serious, `serious/critical violations ${label}`).toEqual([]);
}

for (const { name, width, height } of widths) {
  test(`begin-planning has no serious/critical a11y violations @ ${name} (${width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/begin-planning");
    await page.waitForSelector("h1", { state: "visible" });
    await scan(page, `@ ${name}`);
  });
}

/**
 * The error state is scanned separately. It introduces markup that only exists after a failed
 * submit — the summary, `aria-invalid`, and the error text wired by `aria-describedby` — none
 * of which the idle scan above can see.
 */
test("the inquiry error state has no serious/critical a11y violations", async ({ page }) => {
  await page.goto("/begin-planning");
  const hasForm = (await page.locator("form").count()) > 0;
  test.skip(!hasForm, "built without delivery env vars; form not rendered");

  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("There is something to fix")).toBeVisible();
  await scan(page, "in the error state");
});

test("the confirmation page has no serious/critical a11y violations", async ({ page }) => {
  await page.goto("/begin-planning/received");
  await page.waitForSelector("h1", { state: "visible" });
  await scan(page, "on /begin-planning/received");
});
