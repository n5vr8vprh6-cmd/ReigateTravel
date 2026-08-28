import Link from "next/link";
import { cn } from "@/lib/cn";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  accessibleLabel?: string;
  className?: string;
}

const base =
  "group inline-flex items-center gap-1.5 font-sans text-[0.9375rem] font-semibold text-ink " +
  "underline decoration-taupe decoration-1 underline-offset-4 link-motion " +
  "hover:decoration-copper focus-visible:outline-3";

/**
 * The glyph travels on hover; the underline does not draw in. A link has to be
 * distinguishable without relying on colour, so the underline stays present at rest rather
 * than being the hover affordance (WCAG 1.4.1). Tailwind v4 already scopes `hover:` and
 * `group-hover:` to hover-capable pointers, so touch devices get no dead state.
 */
const glyph =
  "transition-[translate] duration-[var(--duration-base)] ease-[var(--ease-calm)] " +
  "group-hover:translate-x-1 motion-reduce:transition-none";

/** Inline text link with a visible, non-colour-only underline. */
export function TextLink({ href, children, external, accessibleLabel, className }: TextLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={accessibleLabel}
        className={cn(base, className)}
      >
        {children}
        <span aria-hidden="true" data-glyph="" className={glyph}>
          ↗
        </span>
      </a>
    );
  }
  return (
    <Link href={href} aria-label={accessibleLabel} className={cn(base, className)}>
      {children}
      <span aria-hidden="true" data-glyph="" className={glyph}>
        →
      </span>
    </Link>
  );
}
