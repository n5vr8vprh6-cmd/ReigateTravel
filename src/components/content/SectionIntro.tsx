import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WordReveal } from "@/components/content/WordReveal";

type Size = "statement" | "default" | "sm";

/**
 * Visual weight, independent of heading level. Every section heading rendering at the same
 * size is the main reason a long page reads flat, so narrative beats get `statement` and
 * utility sections get `sm`. Semantics stay h2 either way.
 */
const sizeClass: Record<Size, string> = {
  statement: "text-statement",
  default: "text-h2",
  sm: "text-h2-sm",
};

interface SectionIntroProps {
  eyebrow?: string;
  heading: string;
  headingId?: string;
  lead?: string;
  align?: "start" | "center";
  inverse?: boolean;
  className?: string;
  /** Visual weight of the heading — not its level. */
  size?: Size;
  /**
   * Heading level. The homepage H1 lives in the hero, so sections default to h2 — but a
   * standalone route needs its own H1, and until the inquiry form there was no page besides
   * the homepage that had one.
   */
  as?: "h1" | "h2" | "h3";
  /**
   * Reveal the heading word by word as it scrolls in, rather than as one block. Opt-in and
   * off by default: this is for statement-scale narrative beats, and applying it to every
   * heading would turn a gesture into a tic. The heading must be plain text — `WordReveal`
   * cannot preserve a link or inline markup through the split.
   */
  revealByWord?: boolean;
}

/** Reusable heading cluster: eyebrow rule + heading + optional lead. */
export function SectionIntro({
  eyebrow,
  heading,
  headingId,
  lead,
  align = "start",
  inverse = false,
  className,
  size = "default",
  as: Heading = "h2",
  revealByWord = false,
}: SectionIntroProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-[44rem] text-center", className)}>
      {eyebrow ? (
        <Eyebrow align={align} inverse={inverse} className="mb-5">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading
        id={headingId}
        className={cn(
          Heading === "h3" ? "text-h3" : sizeClass[size],
          inverse && "text-ivory",
          // Carries the named view timeline the words animate on. Structural only — with the
          // animation ungated or unrun, this class does nothing on its own.
          revealByWord && "word-reveal"
        )}
      >
        {revealByWord ? <WordReveal text={heading} /> : heading}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "text-body-lg mt-5",
            align === "center" && "mx-auto max-w-[40rem]",
            inverse ? "text-ivory/85" : "text-ink/85"
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
