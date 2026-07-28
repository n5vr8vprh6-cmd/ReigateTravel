"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /**
   * Stagger the direct children instead of moving the block as one unit. Only for content that
   * is genuinely a sequence — render the list element itself (`as="ol"`) so the items are the
   * direct children the stagger selector targets.
   */
  stagger?: boolean;
  className?: string;
  as?: "div" | "section" | "ol" | "ul";
}

/**
 * Scroll reveal for a small number of deliberate moments — not a per-section reflex.
 *
 * **This never animates opacity.** An earlier version faded 0 → 1 and had two failure modes that
 * both shipped blank content: on load the copy rendered and then visibly faded *out* as the hidden
 * state was applied, and when the IntersectionObserver missed an element (fast scrolling, or a
 * programmatic jump past it) that element stayed at opacity 0 permanently. Measured: after a full
 * scroll-through, three of four reveals were still at opacity 0.
 *
 * Transform-only removes the whole class of bug. Worst case — no JS, no observer, a missed
 * callback, a headless render — the content is fully opaque and readable, merely offset by 1.5rem.
 * A `data-reveal-armed` flag gates the transition so arming is instantaneous and only the reveal
 * itself animates, which avoids a downward wobble on mount. A safety timer forces the settled
 * state regardless, so nothing can be left mid-state.
 */
export function Reveal({ children, stagger = false, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Never arm if the user prefers reduced motion — leave the content exactly as rendered.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Already on screen at mount (above the fold): skip the animation rather than moving
    // content the reader is already looking at.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setArmed(true);
    const settle = () => {
      setShown(true);
      observer.disconnect();
      window.clearTimeout(timer);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) settle();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    observer.observe(el);

    // Safety net: if the observer never reports an intersection — a fast scroll past, a
    // programmatic jump, a coalesced callback — resolve to the settled state anyway. The
    // element is readable either way, but it should never be left offset indefinitely.
    // Generous, because the cost of firing early is only a skipped animation while the cost of
    // never firing is content left displaced. Transform-only means it stays readable regardless.
    const timer = window.setTimeout(settle, 6000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      data-reveal={armed ? (shown ? "in" : "out") : undefined}
      // Transitions are gated on this, so arming is instant and only the reveal animates.
      data-reveal-armed={armed && shown ? "" : undefined}
      data-reveal-stagger={stagger ? "" : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
