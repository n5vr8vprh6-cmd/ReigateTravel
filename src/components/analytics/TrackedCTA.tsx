"use client";

import { Button } from "@/components/ui/Button";
import {
  analyticsEvents,
  ctaClickedPayload,
  communityClickedPayload,
  trackEvent,
  type CtaLocation,
} from "@/lib/analytics";

interface TrackedCTAProps {
  href: string;
  children: React.ReactNode;
  /** Our own name for where this control sits. Never a pathname — see `CtaLocation`. */
  location: CtaLocation;
  variant?: "primary" | "secondary";
  inverse?: boolean;
  external?: boolean;
  accessibleLabel?: string;
  className?: string;
  /** Community CTAs report to their own series; the Luma click is not a planning intent. */
  event?: "cta" | "community";
}

/**
 * A `Button` that reports the click.
 *
 * The funnel could measure how many people reached the inquiry and how far through they got,
 * but not how many were offered it and declined — so the widest, most actionable part of the
 * drop-off was invisible. This closes that, and does it without an onClick on every call site
 * that could quietly start passing something it should not.
 *
 * It sends a location label from a closed union and nothing else. Not the href: a URL picks up
 * query strings, and a query string is free text.
 *
 * A client component, so use it only where a CTA genuinely needs measuring. Plain `Button` stays
 * the default everywhere else — this is not a wrapper to apply site-wide.
 */
export function TrackedCTA({
  href,
  children,
  location,
  variant = "primary",
  inverse = false,
  external = false,
  accessibleLabel,
  className,
  event = "cta",
}: TrackedCTAProps) {
  function onClick() {
    if (event === "community") {
      trackEvent(analyticsEvents.communityClicked, communityClickedPayload(location));
      return;
    }
    trackEvent(analyticsEvents.ctaClicked, ctaClickedPayload(location));
  }

  return (
    // The handler goes on the anchor itself rather than a wrapping span: a click handler on a
    // non-interactive element is both an accessibility smell and unreachable by keyboard
    // activation in some browsers. The anchor still navigates regardless of what the handler
    // does, so measurement can never cost a visitor their click.
    <Button
      href={href}
      variant={variant}
      inverse={inverse}
      external={external}
      accessibleLabel={accessibleLabel}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
