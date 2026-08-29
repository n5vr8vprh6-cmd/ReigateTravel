import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { credentials } from "@/content/site";
import { home } from "@/content/home";

/**
 * Section 8 — Tyler introduction. Founder made visible and trustworthy without an influencer
 * persona. Credentials are the exact approved strings.
 *
 * The portrait replaces the Olive typographic panel that stood here while no approved headshot
 * existed (missing-inputs #1, now closed). The panel's quote is not carried over: it repeated
 * the line already in the body copy beside it, and with a real face in the slot the repetition
 * had nowhere to hide.
 *
 * Deliberately still. Every other photograph on the page drifts on scroll or lifts on hover via
 * `EditorialImage`; a portrait of a person does neither. `bg-sand` is the loading ground, for
 * the same reason the interludes carry one.
 */
export function FounderFeature() {
  const { heading, body, cta, portrait } = home.tyler;

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <figure className="m-0">
        <div className="bg-sand relative aspect-square overflow-hidden rounded-sm">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        {/* Not uppercase. At 37 characters this is a sentence rather than a label, and
            uppercase removes the ascender and descender shapes people read words by. */}
        <figcaption className="text-olive mt-3 text-[0.875rem] font-semibold">
          Tyler · Founder, Reigate Travel &amp; Co.
        </figcaption>
      </figure>

      <div className="flex flex-col justify-center">
        <h2 className="text-h2">{heading}</h2>
        {body.map((paragraph) => (
          <p key={paragraph} className="text-body text-ink/85 mt-4">
            {paragraph}
          </p>
        ))}
        <p className="text-body text-olive mt-6 font-semibold">
          {credentials.map((credential, index) => (
            <span key={credential}>
              {credential}
              {index < credentials.length - 1 ? (
                <span aria-hidden="true" className="text-taupe px-2">
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </p>
        <div className="mt-8">
          <Button href={cta.href} variant="secondary">
            {cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
