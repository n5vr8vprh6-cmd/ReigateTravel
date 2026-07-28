import { test, expect, type Page } from "@playwright/test";

const INK = "rgb(27, 27, 27)";
const IVORY = "rgb(246, 242, 237)";

/** WCAG relative luminance / contrast, computed in the page from resolved sRGB values. */
async function contrastOf(page: Page, selector: string) {
  return page.$eval(selector, (el) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const cx = canvas.getContext("2d", { willReadFrequently: true })!;
    // Let the canvas resolve any colour space (oklab/oklch with alpha) to sRGB bytes.
    const resolve = (c: string) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = "#000";
      cx.fillStyle = c;
      cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2], d[3] / 255] as const;
    };
    const lum = (r: number, g: number, b: number) => {
      const f = (c: number) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };

    const fg = resolve(getComputedStyle(el).color);
    // Walk up for the first opaque background.
    let node: HTMLElement | null = el as HTMLElement;
    let bg = resolve("rgba(0,0,0,0)");
    while (node) {
      const c = resolve(getComputedStyle(node).backgroundColor);
      if (c[3] > 0.95) {
        bg = c;
        break;
      }
      node = node.parentElement;
    }
    const composite = (c: readonly [number, number, number, number]) =>
      [
        c[3] * c[0] + (1 - c[3]) * bg[0],
        c[3] * c[1] + (1 - c[3]) * bg[1],
        c[3] * c[2] + (1 - c[3]) * bg[2],
      ] as const;
    const [fr, fgn, fb] = composite(fg);
    const l1 = lum(fr, fgn, fb);
    const l2 = lum(bg[0], bg[1], bg[2]);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  });
}

test.describe("Contrast on the inverse (Olive) band", () => {
  // Regression: headings set their own colour in the base layer, so an h2 on the Olive
  // band inherited Ink and rendered at 1.77:1 — the final CTA was effectively unreadable.
  test("final CTA heading is Ivory, not Ink", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", {
      name: "Begin with how you want the journey to feel.",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveCSS("color", IVORY);
  });

  test("final CTA heading and body clear WCAG AA", async ({ page }) => {
    await page.goto("/");
    // Large text (>=24px) needs 3:1; the body copy beside it needs 4.5:1.
    expect(await contrastOf(page, "#final-cta-heading")).toBeGreaterThanOrEqual(3);
    expect(await contrastOf(page, "#final-cta-heading ~ p")).toBeGreaterThanOrEqual(4.5);
  });

  test("no heading anywhere on an inverse surface renders Ink", async ({ page }) => {
    await page.goto("/");
    const inkHeadings = await page.$$eval(
      '[data-surface="inverse"] :is(h1,h2,h3,h4)',
      (els) => els.filter((el) => getComputedStyle(el).color === "rgb(27, 27, 27)").length
    );
    expect(inkHeadings).toBe(0);
  });

  test("hero copy stays Ivory over the photograph", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1#hero-heading")).toHaveCSS("color", IVORY);
    // The body band directly under the hero must still be Ink on a light surface.
    await expect(page.locator("#explanation-heading")).toHaveCSS("color", INK);
  });
});
