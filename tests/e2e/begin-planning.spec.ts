import { test, expect, type Page } from "@playwright/test";
import { inquirySteps } from "@/content/inquiry";

/**
 * /begin-planning renders one of exactly two states, decided at build time by whether the
 * delivery env vars were present:
 *
 *   - configured   -> the guided inquiry form
 *   - unconfigured -> the approved mailto fallback
 *
 * The suite asserts the boundary itself (never both, never neither) and then asserts the
 * behaviour of whichever state was built. Form behaviour is skipped rather than silently
 * passing when the form was not built, so a green run never overstates what was checked.
 *
 * To exercise the form path, build with the vars set:
 *   RESEND_API_KEY=test INQUIRY_FROM_EMAIL=a@b.co INQUIRY_TO_EMAIL=c@d.co npm run build
 */
async function formIsPresent(page: Page): Promise<boolean> {
  return (await page.locator("form").count()) > 0;
}

/**
 * The step position is rendered twice on purpose: once visibly, and once in an sr-only live
 * region so a screen reader announces the change. Assertions target the visible one.
 */
function stepLabel(page: Page) {
  return page
    .locator("form p")
    .filter({ hasText: /^Step \d of \d/ })
    .first();
}

/**
 * "Step 2 of 3", built from the registry rather than written out. These were literals reading
 * "of 6", and splitting the inquiry into a short brief plus a pre-call form meant finding and
 * editing nine of them by hand. Derived, they describe whatever the form actually is.
 */
const TOTAL = inquirySteps.length;
const stepText = (n: number) => `Step ${n} of ${TOTAL}`;

test.describe("Begin Planning", () => {
  test("renders exactly one of the form or the mailto fallback", async ({ page }) => {
    await page.goto("/begin-planning");
    const hasForm = await formIsPresent(page);
    const hasMailto = (await page.locator('a[href^="mailto:"]').count()) > 0;
    // The footer always carries a mailto, so the fallback is identified by its own copy.
    const hasFallbackCopy = await page
      .getByText("not accepting submissions just yet")
      .isVisible()
      .catch(() => false);

    expect(hasMailto).toBe(true);
    expect(hasForm !== hasFallbackCopy, "exactly one state must render").toBe(true);
  });

  test("has exactly one h1", async ({ page }) => {
    await page.goto("/begin-planning");
    // No page except the homepage had an h1 before this work; the form page is a landing
    // target for the site's primary conversion and needs its own.
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("every internal link on the page resolves", async ({ page, request }) => {
    await page.goto("/begin-planning");
    const hrefs = await page.$$eval('a[href^="/"]', (els) =>
      Array.from(new Set(els.map((el) => el.getAttribute("href")!.split("#")[0]!).filter(Boolean)))
    );
    for (const href of hrefs) {
      expect((await request.get(href)).status(), `${href} should return 200`).toBe(200);
    }
  });

  test.describe("the guided inquiry", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/begin-planning");
      test.skip(!(await formIsPresent(page)), "built without delivery env vars; form not rendered");
    });

    test("starts on the first step and shows the step in text, not by colour", async ({ page }) => {
      await expect(stepLabel(page)).toContainText(stepText(1));
    });

    test("carries a labelled honeypot that is hidden from sighted users", async ({ page }) => {
      const honeypot = page.locator('input[name="website"]');
      await expect(honeypot).toHaveCount(1);
      await expect(honeypot).not.toBeInViewport();
      // Deliberately NOT aria-hidden: a focusable control hidden from the accessibility tree
      // is a serious axe violation, and the a11y gate fails on serious.
      await expect(honeypot).toHaveAttribute("tabindex", "-1");
      await expect(page.getByText("Leave this field blank")).toHaveCount(1);
    });

    test("does not pre-tick consent", async ({ page }) => {
      await expect(page.locator('input[name="consent"]')).not.toBeChecked();
    });

    test("blocks advancing past an empty required field and says why", async ({ page }) => {
      await page.getByRole("button", { name: "Continue" }).click();
      await expect(page.getByText("There is something to fix")).toBeVisible();
      // The message appears twice by design: once as a link in the summary, once beside the
      // field. Both are asserted rather than loosening the locator, because the pair is the
      // behaviour - a summary you can act on, and an explanation where the problem is.
      await expect(page.getByRole("link", { name: /Please add your first name/ })).toBeVisible();
      await expect(page.locator("#f-firstName-error")).toBeVisible();
      // Still on step 1 — the step did not advance.
      await expect(stepLabel(page)).toContainText(stepText(1));
    });

    test("associates an error with its field for screen readers", async ({ page }) => {
      await page.getByRole("button", { name: "Continue" }).click();
      const field = page.locator("#f-firstName");
      await expect(field).toHaveAttribute("aria-invalid", "true");
      const describedBy = await field.getAttribute("aria-describedby");
      expect(describedBy).toContain("f-firstName-error");
    });

    test("advances and returns without losing what was typed", async ({ page }) => {
      await page.fill("#f-firstName", "Ada");
      await page.fill("#f-lastName", "Okonkwo");
      await page.fill("#f-email", "ada@example.com");
      await page.getByRole("button", { name: "Continue" }).click();
      await expect(stepLabel(page)).toContainText(stepText(2));

      await page.getByRole("button", { name: "Back" }).click();
      await expect(stepLabel(page)).toContainText(stepText(1));
      await expect(page.locator("#f-firstName")).toHaveValue("Ada");
    });

    test("moves focus to the new step's heading on advance", async ({ page }) => {
      await page.fill("#f-firstName", "Ada");
      await page.fill("#f-lastName", "Okonkwo");
      await page.fill("#f-email", "ada@example.com");
      await page.getByRole("button", { name: "Continue" }).click();
      await expect(page.locator("#step-journey-heading")).toBeFocused();
    });

    test("Enter in a text field advances rather than submitting", async ({ page }) => {
      await page.fill("#f-firstName", "Ada");
      await page.fill("#f-lastName", "Okonkwo");
      await page.fill("#f-email", "ada@example.com");
      await page.locator("#f-firstName").press("Enter");
      await expect(stepLabel(page)).toContainText(stepText(2));
    });

    test("is operable by keyboard alone", async ({ page }) => {
      await page.locator("#f-firstName").focus();
      await page.keyboard.type("Ada");
      await page.keyboard.press("Tab");
      await page.keyboard.type("Okonkwo");
      await page.keyboard.press("Tab");
      await page.keyboard.type("ada@example.com");
      await expect(page.locator("#f-email")).toHaveValue("ada@example.com");
    });

    test("keeps every control at or above the 44px target size", async ({ page }) => {
      const small = await page.$$eval(
        "form input, form select, form textarea, form button",
        (els) =>
          els
            .filter((el) => {
              // Steps out of view carry the `hidden` attribute, so their controls measure 0.
              // Only what the visitor can actually reach is in scope for target size.
              if (!el.checkVisibility()) return false;
              // The off-screen honeypot is exempt: it is not a control anyone should reach.
              if (el.getAttribute("name") === "website") return false;
              if (el.getAttribute("type") === "hidden") return false;
              // Radios and checkboxes carry their target on the wrapping label.
              if (el.getAttribute("type") === "radio") return false;
              if (el.getAttribute("type") === "checkbox") return false;
              return true;
            })
            .filter((el) => el.getBoundingClientRect().height < 44)
            .map((el) => el.getAttribute("name") ?? el.tagName)
      );
      expect(small).toEqual([]);
    });

    /**
     * The progress device is the site's signature mark travelling along a track, not a bar
     * filling up. It is decorative and aria-hidden, so these assertions protect the visual
     * guarantee only - the step position is carried in text by `stepLabel`, asserted above,
     * and that remains the accessible source of truth.
     */
    test("the horizon mark advances along the track as steps advance", async ({ page }) => {
      const readMark = () =>
        page.evaluate(() => {
          const mark = document.querySelector(".inquiry-progress-mark");
          const fill = document.querySelector(".inquiry-progress-fill");
          if (!mark || !fill) return null;
          const track = mark.parentElement!.getBoundingClientRect();
          return {
            left: Math.round(mark.getBoundingClientRect().left - track.left),
            fill: Math.round(fill.getBoundingClientRect().width),
            track: Math.round(track.width),
          };
        });

      const first = await readMark();
      expect(first, "the progress device must render").not.toBeNull();

      await page.fill("#f-firstName", "Ada");
      await page.fill("#f-lastName", "Lovelace");
      await page.fill("#f-email", "ada@example.com");
      await page.getByRole("button", { name: "Continue" }).click();
      await expect(stepLabel(page)).toContainText(stepText(2));
      // The transition runs for --duration-slow; poll rather than race it.
      await expect
        .poll(async () => (await readMark())!.left, {
          message: "the mark must move forward with the step",
        })
        .toBeGreaterThan(first!.left);

      const second = await readMark();
      // The fill stops at the mark rather than under its leading edge, and neither may run
      // past the end of the track.
      expect(second!.fill).toBeGreaterThan(second!.left);
      expect(second!.left).toBeLessThan(second!.track);
      expect(second!.fill).toBeLessThanOrEqual(second!.track);
    });

    test("the standing index names the current step in text, not weight alone", async ({
      page,
    }) => {
      // Font weight is the visual cue; on its own that is meaning by style. A visually-hidden
      // word carries the same fact for anyone not seeing the weight.
      const index = page.locator("form aside");
      await expect(index).toHaveCount(1);
      await expect(index.getByRole("listitem").filter({ hasText: "Contact" })).toContainText(
        "(current step)"
      );
      // ...and it must move with the step, not stay pinned to the first item.
      await page.fill("#f-firstName", "Ada");
      await page.fill("#f-lastName", "Lovelace");
      await page.fill("#f-email", "ada@example.com");
      await page.getByRole("button", { name: "Continue" }).click();
      await expect(index.getByRole("listitem").filter({ hasText: "Journey" })).toContainText(
        "(current step)"
      );
      await expect(index.getByRole("listitem").filter({ hasText: "Contact" })).not.toContainText(
        "(current step)"
      );
    });
  });

  /**
   * Reduced motion must not leave the progress device stranded. The transition is removed, but
   * the mark still has to be in the right place - a progress indicator that does not move is
   * worse than one that jumps, because it reports the wrong step.
   */
  test("under reduced motion the progress mark still lands on the new step", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/begin-planning");
    test.skip(!(await formIsPresent(page)), "built without delivery env vars; form not rendered");

    const markLeft = () =>
      page.evaluate(() => {
        const mark = document.querySelector(".inquiry-progress-mark")!;
        return Math.round(
          mark.getBoundingClientRect().left - mark.parentElement!.getBoundingClientRect().left
        );
      });

    const before = await markLeft();
    await page.fill("#f-firstName", "Ada");
    await page.fill("#f-lastName", "Lovelace");
    await page.fill("#f-email", "ada@example.com");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(stepLabel(page)).toContainText(stepText(2));
    // No transition to wait out: it should already be there.
    expect(await markLeft()).toBeGreaterThan(before);
    await ctx.close();
  });
});
