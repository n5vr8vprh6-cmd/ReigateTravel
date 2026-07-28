import { cn } from "@/lib/cn";
import type { OfferStatus } from "@/types/content";

interface StatusLabelProps {
  status: OfferStatus;
  className?: string;
}

const labelText: Record<OfferStatus, string> = {
  available: "Available now",
  "in-development": "In development",
};

/**
 * Offer-status chip. Meaning is carried by the visible TEXT, never colour alone
 * (WCAG 1.4.1). The small marker is decorative. Ink text on a hairline chip keeps
 * AA contrast on any light band.
 */
export function StatusLabel({ status, className }: StatusLabelProps) {
  return (
    <span
      className={cn(
        "border-ink/20 inline-flex items-center gap-2 rounded-sm border bg-white/60 px-2.5 py-1",
        "text-ink font-sans text-[0.6875rem] font-semibold tracking-[0.12em] uppercase",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", status === "available" ? "bg-olive" : "bg-taupe")}
      />
      {labelText[status]}
    </span>
  );
}
