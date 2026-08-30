"use client";

import { useEffect } from "react";
import { analyticsEvents, inquiryReceivedPayload, trackEvent } from "@/lib/analytics";

/**
 * Marks a delivered inquiry.
 *
 * `inquiry_submitted` fires when Send is pressed, which is not the same thing — the server can
 * still reject the submission, and until this existed a genuine success was measurable only as
 * a page view on a noindexed route that nothing else linked to. This is the rung the funnel's
 * conversion rate should actually be calculated against.
 *
 * Renders nothing. It is a client component purely because the event belongs to the browser.
 */
export function InquiryReceivedBeacon() {
  useEffect(() => {
    trackEvent(analyticsEvents.inquiryReceived, inquiryReceivedPayload());
  }, []);

  return null;
}
