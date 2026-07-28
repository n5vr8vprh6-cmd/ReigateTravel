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
  "inline-flex items-center gap-1.5 font-sans text-[0.9375rem] font-semibold text-ink " +
  "underline decoration-taupe decoration-1 underline-offset-4 transition-colors " +
  "duration-[var(--duration-base)] hover:decoration-copper focus-visible:outline-3";

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
        <span aria-hidden="true">↗</span>
      </a>
    );
  }
  return (
    <Link href={href} aria-label={accessibleLabel} className={cn(base, className)}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
