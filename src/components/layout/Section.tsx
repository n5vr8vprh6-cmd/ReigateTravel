import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";

type Surface = "ivory" | "white" | "sand" | "inverse";
type Size = "default" | "lg";

const surfaceClass: Record<Surface, string> = {
  ivory: "bg-surface text-ink",
  white: "bg-surface-raised text-ink",
  sand: "bg-surface-sand text-ink",
  inverse: "bg-surface-inverse text-ivory",
};

/** var() form is required — see the note on --spacing-section in globals.css. */
const sizeClass: Record<Size, string> = {
  default: "py-[var(--spacing-section)]",
  lg: "py-[var(--spacing-section-lg)]",
};

interface SectionProps {
  children: React.ReactNode;
  /** Background band — deliberate rhythm, never uniform beige. */
  surface?: Surface;
  /** Vertical rhythm. `lg` is for emphasis moments so spacing varies rather than being uniform. */
  size?: Size;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Set false to manage the inner container yourself (e.g. full-bleed hero). */
  contained?: boolean;
  width?: "content" | "prose";
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

/** A vertical page band with consistent rhythm and a semantic surface role. */
export function Section({
  children,
  surface = "ivory",
  size = "default",
  id,
  className,
  containerClassName,
  contained = true,
  width = "content",
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      data-surface={surface === "inverse" ? "inverse" : undefined}
      className={cn(sizeClass[size], surfaceClass[surface], className)}
      {...aria}
    >
      {contained ? (
        <Container width={width} className={containerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
