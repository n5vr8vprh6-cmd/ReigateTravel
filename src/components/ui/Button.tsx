import Link from "next/link";
import { cn } from "@/lib/cn";
import { buttonBase, buttonVariants, type ButtonVariant } from "@/components/ui/buttonStyles";

/**
 * Appearance lives in `buttonStyles.ts`, shared with `ActionButton`, so the link button and the
 * submit button cannot drift apart.
 */
type Variant = ButtonVariant;

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
  const classes = cn(
    buttonBase,
    buttonVariants[inverse ? "inverse" : "default"][variant],
    className
  );
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
