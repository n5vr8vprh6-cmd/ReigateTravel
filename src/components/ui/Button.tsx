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
  "font-sans text-[0.9375rem] font-semibold tracking-wide transition-[colors,translate] " +
  "duration-[var(--duration-base)] ease-[var(--ease-calm)] focus-visible:outline-3 " +
  // A real pressed state. `translate` rather than `transform` so it never fights the
  // scroll-linked transforms elsewhere, and it moves no neighbouring layout.
  "active:translate-y-px";

const variants: Record<"default" | "inverse", Record<Variant, string>> = {
  default: {
    // Ink fill / Ivory text on Ivory / Sand backgrounds. AA contrast.
    primary: "bg-ink text-ivory hover:bg-olive",
    // Outlined, so the border is the only thing identifying this as a control — which puts it
    // under WCAG 2.2 SC 1.4.11 and its 3:1 floor, measured against the band behind it.
    //   ink/40 was 2.45:1 on Ivory and 2.31:1 on Sand — under the floor on both.
    //   ink/55 is  3.75:1 on Ivory and 3.39:1 on Sand — clears both with the palette untouched.
    // Hover firms to Olive (8.75:1 / 6.37:1). It used to firm to Copper, which measured 2.46:1 on
    // Ivory and 1.79:1 on Sand — the affordance got *weaker* on interaction. Copper still does
    // real work here, as the ink/5 wash's companion elsewhere on the page; it just cannot be the
    // thing carrying the boundary. Contrast of the label itself is carried by Ink, as before.
    secondary: "border border-ink/55 text-ink hover:border-olive hover:bg-ink/5",
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
