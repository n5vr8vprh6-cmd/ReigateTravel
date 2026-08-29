import Image from "next/image";
import { cn } from "@/lib/cn";

interface ScrollSequenceProps {
  /** Vertical sprite strip: every frame stacked, all the same size. */
  src: string;
  /** The frame-0 still, shown instead of the strip below `lg`. See the note on mobile below. */
  still: string;
  /** Meaningful description of what the sequence depicts, not of the animation. */
  alt: string;
  /** How many frames the strip contains. Must match exactly or the walk drifts. */
  frames: number;
  /** Intrinsic size of ONE frame, used to derive the strip's dimensions. */
  frameWidth: number;
  frameHeight: number;
  className?: string;
  sizes?: string;
}

/**
 * A scroll-scrubbed image sequence — the technique behind the "product disassembles as you
 * scroll" pages, applied here to a woman descending a flight of steps.
 *
 * **No JavaScript.** The strip is one tall image inside an `overflow: hidden` frame, stepped
 * one frame at a time by a `steps()` animation on a scroll timeline. Because scroll-driven
 * animation is a function of scroll position, scrolling back up walks her back up the steps
 * for free — there is no playhead or state to reverse.
 *
 * Chosen over scrubbing a video: MP4 seeking is not frame-accurate, so `currentTime` scrubbing
 * jumps between keyframes and stutters. It is also far lighter — the 5s source clip is 14MB
 * where this strip is ~1.4MB, and next/image serves it re-encoded and smaller again.
 *
 * **Desktop only, and not for taste reasons.** A 24-frame strip has a ~1:30 aspect ratio, and
 * that turns pathological on a phone:
 *
 * - At 390px wide the strip renders as a **10,260px-tall layer**. Mobile GPUs commonly cap
 *   textures at 4096–8192px, and past that the browser falls back to software rasterisation —
 *   which is exactly what makes a scroll animation choppy.
 * - `next/image` cannot serve it properly either. A full-resolution resize would be 36,000px
 *   tall, so it clamps: measured on a DPR-3 phone it delivered a **166px-wide** image to fill
 *   390 CSS px. Blurry, and pointless bytes.
 *
 * So below `lg` the frame-0 still renders instead. It is the image the strip was generated
 * from, so the composition is identical — the visitor simply sees the photograph rather than
 * the walk. The strip sits in a `display: none` container and is lazily loaded, so a phone
 * never downloads it.
 *
 * Without scroll-timeline support, or under reduced motion, the desktop animation never runs
 * and frame 0 shows as an ordinary still. Nothing is hidden and nothing is mid-stride.
 */
export function ScrollSequence({
  src,
  still,
  alt,
  frames,
  frameWidth,
  frameHeight,
  className,
  sizes = "(max-width: 1024px) 100vw, 45vw",
}: ScrollSequenceProps) {
  // The last frame sits (frames - 1)/frames of the way down the strip. Paired with
  // steps(frames, jump-none) below, each step advances exactly one frame.
  const travel = `-${(((frames - 1) / frames) * 100).toFixed(4)}%`;
  const aspectRatio = `${frameWidth} / ${frameHeight}`;

  return (
    // One wrapper, so this occupies a single grid cell wherever it is placed. Two siblings
    // would create two cells and quietly break every layout that contains it.
    <div className={cn("relative w-full", className)}>
      <div className="bg-sand relative w-full overflow-hidden lg:hidden" style={{ aspectRatio }}>
        <Image src={still} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>

      <div
        className="sequence-frame bg-sand relative hidden w-full overflow-hidden lg:block"
        // The step count has to match the strip exactly or the walk drifts off its frames.
        // `steps()` cannot reliably take a custom property, so each supported count gets its
        // own rule in globals.css keyed off this attribute.
        data-frames={frames}
        style={{
          ["--sequence-travel" as string]: travel,
          // The window MUST be exactly one frame tall. It is derived from the frame's own
          // dimensions rather than hardcoded, because a window taller than a frame shows the
          // next frame bleeding in underneath — the failure is silent and looks like a glitch.
          // (Shorter is safe: that is just a crop of a single frame.)
          aspectRatio,
        }}
      >
        {/* Lower quality than a hero still would take: this is many frames in one file, only
            ever seen one frame at a time and in motion, so compression artefacts that would
            show in a static hero are invisible here. Worth ~35% of the payload. */}
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          width={frameWidth}
          height={frameHeight * frames}
          sizes={sizes}
          quality={58}
          className="sequence-strip absolute top-0 left-0 w-full max-w-none"
        />
      </div>
    </div>
  );
}
