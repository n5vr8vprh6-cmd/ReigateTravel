import { methodStages } from "@/content/method";

/**
 * Section 5 — The Reigate Method. Five named stages as an ordered list (order is meaning).
 * This is the page's process proof, standing in for testimonials the brand has not earned.
 *
 * Numerals are Olive, not Copper: the numeral is the only visual carrier of sequence for
 * sighted users, and Copper on white is 2.74:1 — under the 3:1 floor for large text.
 *
 * Part of the page's one pinned moment. The `.method-track` / `.method-frame` wrappers live in
 * [page.tsx](src/app/page.tsx) and deliberately enclose the section heading as well as these
 * stages: pinning the stages alone left the visitor looking at five floating labels with no
 * context, because the heading had already scrolled away above the sticky frame.
 *
 * Everywhere the pinning does not apply — no support for scroll timelines, reduced motion, JS
 * off — this is exactly the five-column list it has always been. All the pinning lives in CSS
 * behind `@supports`, so the fallback needs no separate code path.
 */
export function ProcessSteps() {
  return (
    <ol className="reveal-stagger method-stages mt-10 grid gap-x-6 gap-y-8 lg:grid-cols-5">
      {methodStages.map((stage) => (
        <li key={stage.name} className="method-stage relative pt-5" data-stage={stage.index}>
          {/* Each stage's own rule fills in Copper as that stage arrives, replacing the
              single full-width progress bar that used to sit above the row. One device
              instead of two: the rule now marks the step it belongs to rather than
              reporting overall completion. Decorative — the numerals and names carry the
              order — so it is free to scale from zero. */}
          <span
            aria-hidden="true"
            className="bg-taupe/50 absolute inset-x-0 top-0 block h-px overflow-hidden"
          >
            <span className="method-rule bg-copper block h-px origin-left" />
          </span>
          <span
            aria-hidden="true"
            className="font-display text-olive block text-[1.75rem] leading-none"
          >
            {stage.index}
          </span>
          <h3 className="font-display text-h3 mt-3">{stage.name}</h3>
          <p className="text-body text-ink/80 mt-2">{stage.description}</p>
        </li>
      ))}
    </ol>
  );
}
