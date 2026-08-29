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

/**
 * /travel-planning is the page the Charter routes visitors through before the inquiry, so it
 * carries real content rather than a shell and needs the same scan. It reuses ProcessSteps and
 * RecognitionList from the homepage, and adds a definition list the homepage does not have.
 */
for (const { name, width, height } of widths) {
  test(`travel-planning has no serious/critical a11y violations @ ${name} (${width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/travel-planning");
    await page.waitForSelector("h1", { state: "visible" });
    // Settle the scroll reveals before scanning, for the reason the homepage spec explains:
    // axe samples whatever frame it catches, and an in-flight transform is not the state
    // WCAG governs.
    await page.evaluate(async () => {
      const step = Math.max(200, window.innerHeight);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);
    await scan(page, `on /travel-planning @ ${name}`);
  });
}

test("travel-planning has exactly one h1 and no skipped heading levels", async ({ page }) => {
  await page.goto("/travel-planning");
  await expect(page.locator("h1")).toHaveCount(1);
  const levels = await page.$$eval("h1,h2,h3", (els) => els.map((e) => Number(e.tagName[1])));
  for (let i = 1; i < levels.length; i++) {
    expect(
      levels[i]! - levels[i - 1]!,
      `heading jumped from h${levels[i - 1]} to h${levels[i]}`
    ).toBeLessThanOrEqual(1);
  }
});

for (const { name, width, height } of widths) {
  test(`faq has no serious/critical a11y violations @ ${name} (${width}px)`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/faq");
    await page.waitForSelector("h1", { state: "visible" });
    await page.evaluate(async () => {
      const step = Math.max(200, window.innerHeight);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);
    await scan(page, `on /faq @ ${name}`);
  });
}

test("faq structured data matches what the page renders", async ({ page }) => {
  await page.goto("/faq");
  const blocks = await page.$$eval('script[type="application/ld+json"]', (els) =>
    els.map((e) => JSON.parse(e.textContent ?? "{}"))
  );
  const faqBlock = blocks.find((b) => b["@type"] === "FAQPage");
  expect(faqBlock, "an FAQPage block should be present").toBeTruthy();

  // Google requires the answers to be visible on the page. Assert it rather than assume it:
  // schema that describes content the visitor cannot see is the thing that earns a penalty.
  const visible = (await page.locator("main").innerText()).toLowerCase();
  for (const entry of faqBlock.mainEntity) {
    expect(visible, `question not visible on the page: ${entry.name}`).toContain(
      entry.name.toLowerCase()
    );
  }
});
