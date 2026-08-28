import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const widths = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const { name, width, height } of widths) {
  test(`homepage has no serious/critical a11y violations @ ${name} (${width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    // Wait for the real last section before scanning. Kept after the Suspense boundary was
    // removed: it is a cheap guard that the page has finished painting, and `visible` still
    // means something `attached` does not.
    await page.waitForSelector("#final-cta-heading", { state: "visible" });

    // Drive every scroll reveal to completion before scanning. axe samples whatever frame it
    // catches, so an in-flight fade reports the intermediate colour as a contrast failure —
    // WCAG 1.4.3 governs the settled state, not individual frames of a transition. Scrolling
    // through and settling scans the real end state rather than suppressing the rule.
    await page.evaluate(async () => {
      const step = Math.max(200, window.innerHeight);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );

    if (serious.length) {
      console.log(
        `Violations @ ${name}:`,
        serious.map((v) => `${v.id} (${v.impact}) — ${v.nodes.length} node(s)`).join("\n")
      );
    }
    expect(serious, `serious/critical violations @ ${name}`).toEqual([]);
  });
}
