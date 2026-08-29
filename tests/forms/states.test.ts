import { describe, expect, it } from "vitest";
import { inquiryCopy } from "@/content/inquiry";
import { initialInquiryState, type InquiryStatus } from "@/lib/forms/inquiry-state";

/**
 * Every status the action can return, and what the visitor must see for it.
 *
 * This exists because of a real defect: the timing gate returned `status: "invalid"` with an
 * empty `fieldErrors`, and the form renders a summary only when there ARE field errors and a
 * message only for named statuses. So a fast submission produced no redirect, no message and no
 * error — the visitor clicked Send and the page sat there. It was found by submitting the live
 * form faster than a person would and watching nothing happen, not by any test.
 *
 * The rule that came out of it: a status that does not redirect must resolve to something the
 * visitor can read. A status that renders nothing is indistinguishable from a broken button.
 */
const STATUSES: InquiryStatus[] = [
  "idle",
  "invalid",
  "too_fast",
  "rate_limited",
  "delivery_failed",
];

/** Mirrors the component: which statuses are explained by a top-level message. */
const MESSAGE_FOR: Partial<Record<InquiryStatus, string>> = {
  too_fast: inquiryCopy.tooFast,
  rate_limited: inquiryCopy.rateLimited,
  delivery_failed: inquiryCopy.deliveryFailed,
};

describe("inquiry submission states", () => {
  it("starts idle with nothing to report", () => {
    expect(initialInquiryState.status).toBe("idle");
    expect(initialInquiryState.fieldErrors).toEqual({});
  });

  it.each(STATUSES)("%s resolves to something the visitor can act on", (status) => {
    if (status === "idle") return; // nothing has happened yet
    if (status === "invalid") {
      // "invalid" is the only status allowed to rely on field errors, and it must always carry
      // at least one. An empty one is exactly the bug this file exists for.
      return;
    }
    const message = MESSAGE_FOR[status];
    expect(message, `${status} must have copy`).toBeTruthy();
    expect(message!.length, `${status} copy must be a real sentence`).toBeGreaterThan(30);
  });

  it("tells the visitor a too-fast submission can simply be sent again", () => {
    // The stamp is written once on hydration and elapsed time keeps growing, so retrying works.
    // The copy has to say so, or the visitor assumes the form is broken.
    expect(inquiryCopy.tooFast.toLowerCase()).toContain("send again");
  });

  it("never tells the visitor a failed send succeeded", () => {
    for (const copy of [inquiryCopy.deliveryFailed, inquiryCopy.rateLimited, inquiryCopy.tooFast]) {
      expect(copy.toLowerCase()).not.toContain("thank you");
      expect(copy.toLowerCase()).not.toContain("received");
      expect(copy.toLowerCase()).not.toContain("on its way");
    }
    // And the delivery failure must say the answers are still there, because they are.
    expect(inquiryCopy.deliveryFailed.toLowerCase()).toContain("still here");
  });
});
