import { Button } from "@/components/ui/Button";
import { HorizonRule } from "@/components/ui/HorizonRule";
import { credentials } from "@/content/site";
import { home } from "@/content/home";

/**
 * Section 8 — Tyler introduction. Founder made visible and trustworthy without an
 * influencer persona. No approved headshot exists, so the portrait slot is a quiet Olive
 * typographic panel (never an AI face). Credentials are the exact approved strings.
 */
export function FounderFeature() {
  const { heading, body, cta } = home.tyler;

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      {/* Typographic fallback panel (headshot pending — see missing-inputs.md #1) */}
      <div
        data-surface="inverse"
        className="bg-surface-inverse text-ivory flex min-h-[16rem] flex-col justify-between rounded-sm p-8"
      >
        <HorizonRule tone="rule" className="w-12 opacity-70" />
        <p className="font-display text-[1.6rem] leading-snug text-balance">
          Understand the person before recommending the place.
        </p>
        <p className="text-eyebrow text-ivory/70 font-semibold uppercase">
          Tyler · Founder, Reigate Travel &amp; Co.
        </p>
      </div>

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
