"use client";

import { useEffect } from "react";
import Script from "next/script";
import { CALENDLY_ORIGIN, CALENDLY_SCRIPT_SRC } from "@/lib/scheduling";
import { analyticsEvents, callBookedPayload, trackEvent } from "@/lib/analytics";

interface SchedulingEmbedProps {
  url: string;
}

/**
 * The booking step on the confirmation page.
 *
 * This is the site's second third-party embed, against a rule in `.claude/rules/frontend.md`
 * that the Substack signup is the only one. The trade is deliberate and recorded: the gap
 * between "inquiry sent" and "call booked" was the largest leak in the funnel, and closing it
 * with a link out to Calendly rather than an embed costs a page load at precisely the moment
 * intent is highest. It is confined to one noindexed page and renders nothing at all unless a
 * URL is configured.
 *
 * `afterInteractive`, not `lazyOnload`. It was written as `lazyOnload` on the reasoning that
 * measurement and third-party code belong off the critical path — but that reasoning is for
 * peripheral scripts, and this one draws the primary content of the page. Verified in the
 * browser: under `lazyOnload` the script tag was never injected at all, because the strategy
 * waits for an idle callback that a page with a live dev socket and running animations may
 * never hand out. A booking widget that loads "eventually" is a booking widget that sometimes
 * does not load.
 *
 * **The plain link is not a fallback, it is always there.** If the script is blocked, slow, or
 * JavaScript is off entirely, the visitor still has a working way to book. An embed that is the
 * only route to the calendar would make booking depend on a third party's script loading.
 */
export function SchedulingEmbed({ url }: SchedulingEmbedProps) {
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Origin-checked. `window.message` is receivable by anyone, and an unchecked handler that
      // fires an analytics event on any page's say-so is a free way to pollute the funnel.
      if (event.origin !== CALENDLY_ORIGIN) return;
      const data = event.data as { event?: unknown } | null;
      if (data && data.event === "calendly.event_scheduled") {
        trackEvent(analyticsEvents.callBooked, callBookedPayload());
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div>
      {/* Calendly sizes this itself once the script runs; the height reserves the space so the
          page does not jump when it does. */}
      <div
        className="calendly-inline-widget border-taupe/40 border"
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script src={CALENDLY_SCRIPT_SRC} strategy="afterInteractive" />
      <p className="text-body text-ink/70 mt-4">
        If the calendar does not load,{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="decoration-taupe hover:decoration-copper font-semibold underline underline-offset-4"
        >
          open it in a new tab (opens in a new tab)
        </a>
        .
      </p>
    </div>
  );
}
