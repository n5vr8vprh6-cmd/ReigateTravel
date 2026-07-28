import { methodStages } from "@/content/method";

/**
 * Section 5 — The Reigate Method. Five named stages as an ordered list (order is meaning).
 * This is the page's process proof, standing in for testimonials the brand has not earned.
 *
 * Numerals are Olive, not Copper: the numeral is the only visual carrier of sequence for
 * sighted users, and Copper on white is 2.74:1 — under the 3:1 floor for large text.
 * Layout is 1 column, then 5 across at lg — a five-item sequence never leaves a ragged
 * trailing cell, which 3- or 2-column grids both do.
 */
export function ProcessSteps() {
  return (
    // `reveal-stagger` is scroll-linked CSS (globals.css) — staggered because this is a real
    // ordered sequence, so the motion carries the order rather than decorating it.
    <ol className="reveal-stagger mt-10 grid gap-x-6 gap-y-8 lg:grid-cols-5">
      {methodStages.map((stage) => (
        <li key={stage.name} className="border-taupe/50 border-t pt-5">
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
