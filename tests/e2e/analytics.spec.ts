import { test, expect } from "@playwright/test";

/**
 * Analytics ships OFF, and this file asserts that state rather than the enabled one.
 *
 * That is deliberate. Vercel Web Analytics is not enabled on the project — its script route
 * returns 404 — so shipping the tag would put a failed request and a console error on every
 * page in exchange for no data. The gate (`NEXT_PUBLIC_ANALYTICS`) is what keeps the two facts
 * in step, and this is the guard on the gate: it proves that with the flag unset, the site is
 * exactly as free of third-party JavaScript as it was before any of this was written.
 *
 * The enabled path cannot be asserted here — Playwright builds once, with the flag unset, and a
 * second build purely to observe a script tag is not worth the minutes. It is covered by
 * `tests/unit/analytics.test.ts` at the gate and payload level, and end to end it needs the
 * product switched on in Vercel, which is not something the suite can do.
 */
test.describe("analytics is off until it is switched on", () => {
  test("no measurement script is requested anywhere on the site", async ({ page }) => {
    const requested: string[] = [];
    page.on("request", (r) => {
      if (/_vercel\/(insights|speed-insights)/.test(r.url())) requested.push(r.url());
    });

    for (const route of ["/", "/begin-planning", "/privacy"]) {
      await page.goto(route, { waitUntil: "networkidle" });
    }

    expect(requested, "no analytics script may be fetched while the gate is off").toEqual([]);
  });

  test("the site still loads no third-party JavaScript at all", async ({ page }) => {
    await page.goto("/begin-planning", { waitUntil: "networkidle" });

    // The queue stub and the script are both gated; neither may leave a trace on the page.
    const traces = await page.evaluate(() => ({
      va: typeof (window as unknown as { va?: unknown }).va,
      vaq: typeof (window as unknown as { vaq?: unknown }).vaq,
      insightScripts: document.querySelectorAll('script[src*="_vercel"]').length,
    }));
    expect(traces.va).toBe("undefined");
    expect(traces.vaq).toBe("undefined");
    expect(traces.insightScripts).toBe(0);
  });

  test("the published privacy policy is the real one, not the shell", async ({ page }) => {
    // This assertion used to check a measurement paragraph driven by the analytics flag, so the
    // page could not describe tracking the build was not doing. The client-supplied policy has
    // since replaced that, and it is fixed legal text rather than something that follows a flag.
    // What is asserted now is that the real document is published and intact.
    //
    // The known inconsistency is deliberate and recorded: §12 says the site introduces no
    // website analytics without a policy update, and analytics is on. Tyler adds that sentence
    // to the source document; it is not edited here.
    await page.goto("/privacy");
    const body = await page.locator("main").innerText();
    expect(body, "the shell must be gone").not.toContain("Content pending legal review");
    // Case-insensitive: the effective date is styled uppercase, and innerText returns the
    // transformed text. Asserting the cased string couples this to a styling choice.
    expect(body.toLowerCase()).toContain("effective august 29, 2026");
    expect(body).toContain("1. Information We Collect");
    expect(body).toContain("14. Contact Us");
    // §8 is the clause the inquiry form's consent checkbox leans on.
    expect(body).toContain("not intentionally stored in a separate database");
  });
});
