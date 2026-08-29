import { Fragment } from "react";

interface WordRevealProps {
  /** Plain text only. Never pass a string containing markup or a link — see below. */
  text: string;
}

/**
 * Splits a heading into words so each can rise into place on scroll, one after the next.
 *
 * This is the one item on the MengTo awwwards skill's motion checklist the site did not do:
 * *"Reveal major headings word by word with a restrained stagger."* Every other heading here
 * rises as a block. It is narrative rather than ornamental — it paces a sentence — which is what
 * keeps it clear of the project's own "gratuitous animation" rule. Use it on statement-scale
 * headings that arrive on scroll, and nowhere else.
 *
 * **A server component, deliberately.** The split happens in the render, so the words are plain
 * text in the HTML: the heading reads normally with JavaScript unavailable, and this does not
 * become a fourth client boundary. It is also why the accessible name survives — the spans
 * concatenate back to the original string, which `tests/e2e/reveal.spec.ts` asserts.
 *
 * **Plain text only.** The skill is explicit that split text must never break links or inline
 * markup. Splitting a string cannot preserve them, so anything richer than a sentence must not
 * come through here.
 *
 * The stagger window is fixed rather than per-word, so a three-word heading and a twelve-word
 * heading cascade over the same scroll distance. Without that, long headings drag their last
 * words far up the viewport and the effect stops reading as one gesture.
 */
const STAGGER_WINDOW = 30;

export function WordReveal({ text }: WordRevealProps) {
  const words = text.split(" ").filter(Boolean);
  const step = words.length > 1 ? STAGGER_WINDOW / (words.length - 1) : 0;

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {/* The mask is what the word rises out of. Its padding/negative-margin pair extends the
              clip box below the baseline without moving anything: at these line-heights the
              inline-block box is tighter than the glyphs, so descenders on "Thoughtful" or
              "beginning" would otherwise be shaved off by `overflow: hidden`. */}
          <span className="word-mask">
            <span className="word-rise" style={{ ["--w" as string]: (index * step).toFixed(2) }}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
