"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface AmbientVideoProps {
  src: string;
  /** Shown before the clip plays, wherever it cannot play, and under reduced motion. */
  poster: string;
  className?: string;
  /** Where to hold the frame when the crop is tighter than the source. */
  position?: string;
}

/**
 * A full-viewport ambient clip.
 *
 * This reverses part of decision #43, which removed the hero's Kling video because it was the
 * only motion on the page running on its own clock. That reasoning still stands for the hero,
 * and the hero still has no video. It does not stand here: an interlude has no copy, no CTA and
 * nothing to read, and its entire job is to change the page's tempo. A clip playing itself is
 * what the client asked for and is a reasonable thing for a band whose only purpose is a pause.
 *
 * Three things keep it from becoming the 6.3MB problem that got the last one deleted:
 *
 * - **It is 0.28MB.** The 1080p source was 15.1MB; re-encoding to H.264 at 1280x720 got it to
 *   0.28MB, which is lighter than the 1.4MB sprite strip this replaces.
 * - **Nothing is fetched until it is needed.** `preload="none"` means no bytes move until
 *   `play()` is called, and `play()` only happens when the band is actually on screen.
 *   This bullet used to be half true. `preload="none"` governs the *video*; a `poster`
 *   attribute is fetched eagerly regardless, so 57KB of a band several screens down was landing
 *   inside the hero's LCP window on every visit - measured, not assumed. The still is now a
 *   lazily-loaded `next/image` behind the video instead, which fetches only as the band nears
 *   the viewport and serves AVIF rather than the raw JPEG.
 * - **It plays once per arrival, and does not loop.** The clip is a push-in, so looping would
 *   snap the camera back to the start every five seconds. Playing through and holding on the
 *   last frame reads as a moment rather than a loop, and it replays if the visitor comes back.
 *
 * Under `prefers-reduced-motion` the observer is never attached, so the clip never plays and
 * the poster stands in — the same still the band used before it moved.
 */
export function AmbientVideo({ src, poster, className, position = "center" }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Read the preference here rather than in CSS: the point is not to slow the motion down
    // but to never start the download in the first place.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          el.currentTime = 0;
          // Autoplay can still be refused (iOS low-power mode, for one). The poster is
          // already showing, so a rejection needs no handling beyond not throwing.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("bg-sand relative isolate h-[100svh] w-full overflow-hidden", className)}>
      {/* Frame 0 of the clip, so there is no jump when the video paints over it. Deliberately
          not `priority`: lazy is the entire point, and next/image's own observer loads it with
          enough margin that it is never caught arriving. The video sits on top in DOM order and
          is transparent until it has data, so this is what the band shows until then - and
          permanently under reduced motion, where the observer below never attaches. */}
      <Image
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <video
        ref={ref}
        // No `loop` and no `autoplay`: the observer starts it, and it holds on its last frame.
        muted
        playsInline
        preload="none"
        // Decorative, exactly as the still was. It carries no information the copy depends on,
        // so describing it would make screen-reader users listen to something sighted visitors
        // are not being told.
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
