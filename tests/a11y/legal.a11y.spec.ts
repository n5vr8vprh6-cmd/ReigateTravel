import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Axe coverage for the two long text pages: the Privacy Policy and the accessibility statement.
 *
 * Both were shells until recently, which is why neither was scanned. That is no longer a safe
 * omission — Privacy is now fourteen sections of nested headings and lists, and an accessibility
 * statement that had never itself been scanned would be the single worst page on the site to get
 * wrong.
 *
 * Terms is deliberately not here. It is still a holding page pending a supplied document, and
 * scanning a placeholder would report a clean result that means nothing.
 */
const widths = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const pages = [
  { name: "privacy", path: "/privacy", lastHeading: "#policy-contact" },
  { name: "accessibility", path: "/accessibility", lastHeading: "#a11y-feedback" },
];

for (const { name: pageName, path, lastHeading } of pages) {
  for (const { name, width, height } of widths) {
    test(`${pageName} has no serious/critical a11y violations @ ${name} (${width}px)`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height });
      await page.goto(path);
      // Scan a finished page, not a partial one — the last section's heading is the cheap
      // signal that everything above it has rendered.
      await page.waitForSelector(lastHeading, { state: "visible" });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical"
      );
      if (serious.length) {
        console.log(
          `Violations on ${path} @ ${name}:`,
          serious.map((v) => `${v.id} (${v.impact}) — ${v.nodes.length} node(s)`).join("\n")
        );
      }
      expect(serious, `serious/critical violations on ${path} @ ${name}`).toEqual([]);
    });
  }
}
