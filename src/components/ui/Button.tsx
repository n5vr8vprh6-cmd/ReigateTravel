import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Use on the Olive (inverse) band so contrast stays AA. */
  inverse?: boolean;
  /** Full accessible name when the visible label is terse. */
  accessibleLabel?: string;
  external?: boolean;
  className?: string;
}

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-6 py-3 " +
  "font-sans text-[0.9375rem] font-semibold tracking-wide transition-colors " +
  "duration-[var(--duration-base)] ease-[var(--ease-calm)] focus-visible:outline-3";

const variants: Record<"default" | "inverse", Record<Variant, string>> = {
  default: {
    // Ink fill / Ivory text on Ivory / Sand backgrounds. AA contrast.
    primary: "bg-ink text-ivory hover:bg-olive",
    // Outlined; Ink text with a hairline that firms up on hover.
    secondary: "border border-ink/40 text-ink hover:border-ink hover:bg-ink/5",
  },
  inverse: {
    // On the Olive band: Ivory fill / Ink text.
    primary: "bg-ivory text-ink hover:bg-sand",
    secondary: "border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/10",
  },
};

/**
 * Primary action control, rendered as a link (all Version 1 CTAs navigate).
 * Minimum 44px target. Use `accessibleLabel` to expand terse labels for screen readers.
 */
export function Button({
  href,
  children,
  variant = "primary",
  inverse = false,
  accessibleLabel,
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(base, variants[inverse ? "inverse" : "default"][variant], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={accessibleLabel}
        className={classes}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={accessibleLabel} className={classes}>
      {children}
    </Link>
  );
}
