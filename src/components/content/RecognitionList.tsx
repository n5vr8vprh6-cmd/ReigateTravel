interface RecognitionListProps {
  statements: readonly string[];
}

/**
 * Section 3 — Audience recognition. Second-person statements as a semantic list, laid out as
 * a full-width editorial index. No CTA: this is a recognition beat, not a capture point.
 * No burnout/diagnostic language.
 *
 * Single column by design: five items in a two-column grid leave a ragged empty cell, and
 * the per-item HorizonRule repeated the signature device five times in one section, which
 * spends it. The hairline rules carry the index rhythm on their own.
 */
export function RecognitionList({ statements }: RecognitionListProps) {
  return (
    <ul className="mt-8">
      {statements.map((statement) => (
        <li
          key={statement}
          className="border-ink/15 text-body-lg text-ink border-t py-5 last:border-b"
        >
          <span className="block max-w-[46rem]">{statement}</span>
        </li>
      ))}
    </ul>
  );
}
