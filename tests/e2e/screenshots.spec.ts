import { test } from "@playwright/test";

/** Capture full-page homepage screenshots at the three review widths. */
const widths = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

for (const { name, width, height } of widths) {
  test(`screenshot homepage @ ${name}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.screenshot({ path: `tests/screenshots/home-${name}.png`, fullPage: true });
  });
}
