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

/** A calm two-action close. Primary before secondary; stacks on mobile. */
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
      {/* The signature device closes the page. Copper on Olive is low-contrast by design —
          it is decorative and carries no meaning, so it never needs to clear AA. */}
      <HorizonRule tone="accent" className="mx-auto mb-6 w-16" />
      {/* Headings inherit Ink from the base layer, which loses contrast on the Olive band
          (1.77:1). On an inverse surface the heading must be set to Ivory explicitly. */}
      <h2 id={headingId} className={cn("text-statement", inverse && "text-ivory")}>
        {heading}
      </h2>
      {body ? (
        <p className="text-body-lg mx-auto mt-5 max-w-[38rem] text-balance opacity-90">{body}</p>
      ) : null}
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
      {endline ? (
        <p className="font-display mt-10 text-[0.95rem] italic opacity-70">{endline}</p>
      ) : null}
    </div>
  );
}
