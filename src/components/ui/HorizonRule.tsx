import { cn } from "@/lib/cn";

interface HorizonRuleProps {
  className?: string;
  tone?: "rule" | "accent";
}

/**
 * Signature device: a thin editorial divider with a single quiet wave inflection —
 * a conceptual nod to the Reigate horizon/wave motif, drawn independently. This is NOT
 * the logo and never substitutes for it. Purely decorative (aria-hidden).
 */
export function HorizonRule({ className, tone = "rule" }: HorizonRuleProps) {
  const stroke = tone === "accent" ? "var(--color-copper)" : "var(--color-taupe)";
  return (
    <svg
      className={cn("horizon-rule h-2 w-24", className)}
      viewBox="0 0 96 8"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M0 4 H40 C44 4 45 1 48 1 C51 1 52 4 56 4 H96"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
