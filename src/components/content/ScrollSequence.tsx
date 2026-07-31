import Image from "next/image";
import { cn } from "@/lib/cn";

interface ScrollSequenceProps {
  /** Vertical sprite strip: every frame stacked, all the same size. */
  src: string;
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
 * Without scroll-timeline support, or under reduced motion, the animation simply never runs
 * and frame 0 shows as an ordinary still. Nothing is hidden and nothing is mid-stride.
 */
export function ScrollSequence({
  src,
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

  return (
    <div
      className={cn("sequence-frame bg-sand relative w-full overflow-hidden", className)}
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
        aspectRatio: `${frameWidth} / ${frameHeight}`,
      }}
    >
      {/* Lower quality than a hero still would take: this is 24 frames in one file, only
          ever seen one frame at a time and in motion, so compression artefacts that would
          show in a static hero are invisible here. Worth ~35% of the payload. */}
      <Image
        src={src}
        alt={alt}
        width={frameWidth}
        height={frameHeight * frames}
        sizes={sizes}
        quality={58}
        className="sequence-strip absolute top-0 left-0 w-full max-w-none"
      />
    </div>
  );
}
