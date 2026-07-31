import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";

type Surface = "ivory" | "white" | "sand" | "inverse";
type Size = "sm" | "default" | "lg";

const surfaceClass: Record<Surface, string> = {
  ivory: "bg-surface text-ink",
  white: "bg-surface-raised text-ink",
  sand: "bg-surface-sand text-ink",
  inverse: "bg-surface-inverse text-ivory",
};

/**
 * var() form is required — see the note on --spacing-section in globals.css.
 *
 * Three steps, not two, because uniform band height was the page's core flatness problem:
 * every section measured 0.72–1.2 viewports and the scroll read metronomic. `sm` gives the
 * rhythm a genuine low end so short beats sit between the longer movements.
 */
const sizeClass: Record<Size, string> = {
  sm: "py-[var(--spacing-section-sm)]",
  default: "py-[var(--spacing-section)]",
  lg: "py-[var(--spacing-section-lg)]",
};

interface SectionProps {
  children: React.ReactNode;
  /** Background band — deliberate rhythm, never uniform beige. */
  surface?: Surface;
  /** Vertical rhythm. `lg` is for emphasis moments so spacing varies rather than being uniform. */
  size?: Size;
  /** Renders this band's segment of the journey thread. Off for bands that carry their own. */
  thread?: boolean;
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
  thread = true,
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
      className={cn(
        "relative",
        thread && "journey-band",
        sizeClass[size],
        surfaceClass[surface],
        className
      )}
      {...aria}
    >
      {/* One segment of the journey thread, drawn as this band enters. Sits in the gutter
          outside the content measure, decorative and aria-hidden. Hidden below lg, where the
          gutter is too narrow to carry it. */}
      {thread ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-6 hidden w-px sm:left-8 lg:left-12 lg:block"
        >
          <span
            className={cn(
              "journey-thread block h-full w-px",
              surface === "inverse" ? "bg-ivory/25" : "bg-copper/45"
            )}
          />
        </span>
      ) : null}

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
