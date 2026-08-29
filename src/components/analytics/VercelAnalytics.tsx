import Script from "next/script";
import { analyticsEnabled, ANALYTICS_SCRIPT_SRC } from "@/lib/analytics";

/**
 * Loads Vercel Web Analytics, and only where it has been switched on.
 *
 * Renders nothing at all when the gate is off, which is the state this ships in — Web Analytics
 * is not yet enabled on the project, and its script route 404s until it is. That matters more
 * than it sounds: the site currently loads no third-party JavaScript whatsoever, and a script
 * tag pointing at a 404 would trade that for a failed request and a console error on every page
 * for no data in return.
 *
 * The inline stub is Vercel's own documented snippet, not an invention. It defines `window.va`
 * as a function that queues into `window.vaq`, which the deferred script drains once it loads —
 * without it, any event fired before the script arrives is dropped, and the first step of the
 * funnel is exactly when that happens.
 *
 * `afterInteractive` rather than `beforeInteractive`: measurement must never sit on the critical
 * path. This session already spent effort getting the interlude poster out of the hero's LCP
 * window; putting an analytics script into it would be a poor trade.
 */
export function VercelAnalytics() {
  if (!analyticsEnabled) return null;

  return (
    <>
      <Script id="va-queue" strategy="afterInteractive">
        {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
      </Script>
      <Script src={ANALYTICS_SCRIPT_SRC} strategy="afterInteractive" />
    </>
  );
}
