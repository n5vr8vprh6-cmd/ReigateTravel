import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionIntroProps {
  eyebrow?: string;
  heading: string;
  headingId?: string;
  lead?: string;
  align?: "start" | "center";
  inverse?: boolean;
  className?: string;
  /** Heading level — one H1 per page lives in the hero, so sections use h2 by default. */
  as?: "h2" | "h3";
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
  as: Heading = "h2",
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
        className={cn(Heading === "h2" ? "text-h2" : "text-h3", inverse && "text-ivory")}
      >
        {heading}
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
