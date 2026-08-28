import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { HorizonRule } from "@/components/ui/HorizonRule";
import type { CtaLink } from "@/types/content";

interface CTAPanelProps {
  heading: string;
  headingId?: string;
  body?: string;
  primary: CtaLink;
  secondary?: CtaLink;
  endline?: string;
  /** Rendered on the Olive band, so use inverse button styling. */
  inverse?: boolean;
}

/**
 * A calm two-action close. Primary before secondary; stacks on mobile.
 *
 * Each element sits in its own `.cta-layer` wrapper so the band assembles as the visitor
 * arrives at it — the hero's exit gesture inverted, closing the page the way it opened.
 * The wrappers carry the motion and the content sits inside them, for the same reason the
 * hero does it that way: `animation` is a single property, so a wrapper is what lets a
 * scroll animation and anything on the child coexist instead of one silently replacing
 * the other. Transform only, so an unrun animation leaves an ordinary readable CTA.
 */
export function CTAPanel({
  heading,
  headingId,
  body,
  primary,
  secondary,
  endline,
  inverse = false,
}: CTAPanelProps) {
  return (
    <div className="mx-auto max-w-[48rem] text-center">
      <div className="cta-layer" data-depth="1">
        {/* The signature device closes the page. Copper on Olive is low-contrast by design —
            it is decorative and carries no meaning, so it never needs to clear AA. */}
        <HorizonRule tone="accent" className="mx-auto mb-6 w-16" />
      </div>
      <div className="cta-layer" data-depth="2">
        {/* Headings inherit Ink from the base layer, which loses contrast on the Olive band
            (1.77:1). On an inverse surface the heading must be set to Ivory explicitly. */}
        <h2 id={headingId} className={cn("text-statement", inverse && "text-ivory")}>
          {heading}
        </h2>
      </div>
      {body ? (
        <div className="cta-layer" data-depth="3">
          <p
            data-cta="body"
            className="text-body-lg mx-auto mt-5 max-w-[38rem] text-balance opacity-90"
          >
            {body}
          </p>
        </div>
      ) : null}
      <div className="cta-layer" data-depth="4">
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={primary.href}
            variant="primary"
            inverse={inverse}
            external={primary.external}
            accessibleLabel={primary.accessibleLabel}
            className="w-full sm:w-auto"
          >
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              variant="secondary"
              inverse={inverse}
              external={secondary.external}
              accessibleLabel={secondary.accessibleLabel}
              className="w-full sm:w-auto"
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
      {/* The approved endline, used once on the site. It was the least legible text on the page:
          0.95rem Cormorant italic at weight 400 and opacity-70. Nominal contrast said 5.25:1 and
          passed, but nominal assumes the glyph reaches its full colour — a light serif italic at
          15px has sub-pixel stems that never do, and measured on rendered pixels it came out at a
          2.7:1 median against a 4.5:1 requirement.
          Size and weight are the real fix: they give the stems something to render. The alpha now
          rides on the colour rather than on `opacity`, so this no longer forms a stacking context
          composited against the band. Stays quieter than the body copy above it, as intended. */}
      {endline ? (
        <div className="cta-layer" data-depth="5">
          <p
            data-cta="endline"
            className={cn(
              "font-display mt-10 text-[1.05rem] font-medium italic",
              inverse ? "text-ivory/85" : "text-ink/85"
            )}
          >
            {endline}
          </p>
        </div>
      ) : null}
    </div>
  );
}
