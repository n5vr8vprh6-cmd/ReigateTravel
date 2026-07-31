import Image from "next/image";

interface InterludeProps {
  src: string;
  /**
   * Empty by default and deliberately so. An interlude carries no information — it exists to
   * change the page's tempo — and giving decorative imagery a description makes screen-reader
   * users listen to something sighted users are not being told. Pass a description only if the
   * frame ever starts carrying meaning the surrounding copy depends on.
   */
  alt?: string;
  /** Which part of the frame to hold when the crop is tighter than the source. */
  position?: string;
}

/**
 * A full-viewport photographic break between narrative acts.
 *
 * This exists to fix tempo, not to decorate. Measured before this pass, all eleven sections sat
 * between 0.72 and 1.2 viewports tall — the page was metronomic, and no amount of type or colour
 * work inside that cadence registered as "wow". An interlude is a deliberate full stop: one screen
 * of photography, no copy, no CTA, nothing to read.
 *
 * Rendered as a plain <div>, not a <section>: it has no heading and no accessible name, so making
 * it a sectioning element would add an unlabelled region to the document outline for no benefit.
 */
export function Interlude({ src, alt = "", position = "center" }: InterludeProps) {
  return (
    <div className="interlude-frame relative isolate h-[100svh] w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="interlude-image object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
