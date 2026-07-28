import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { home } from "@/content/home";

/**
 * Section 1 — Hero. States the brand belief and orients the visitor. Headline is the
 * page's single H1. Primary CTA (Begin Planning) is visually dominant.
 *
 * Full-bleed photograph rather than a split panel: this is an image-led travel brand and
 * the photography is its strongest asset. Contrast is still never left to the photograph —
 * a fixed vertical scrim sits between image and copy, and the copy is anchored inside the
 * region where the scrim is at least 72% opaque. Against a pure-white photograph that is
 * still 6:1 for Ivory text, so the guarantee holds for any image placed here.
 */
export function EditorialHero() {
  const { eyebrow, heading, body, primaryCta, secondaryCta, image } = home.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      data-surface="inverse"
      className="relative isolate flex min-h-[min(92svh,48rem)] items-end overflow-hidden"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="hero-drift absolute inset-0 -z-20 object-cover object-[62%_34%]"
      />
      {/* Contrast scrim — an opacity ramp, not a decorative gradient. It holds at >=0.74
          across the full height of the copy block and only falls away above it, so the
          upper third of the photograph still reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(27,27,27,0.92)_0%,rgba(27,27,27,0.88)_45%,rgba(27,27,27,0.74)_62%,rgba(27,27,27,0.35)_80%,rgba(27,27,27,0.15)_100%)]"
      />

      <Container className="hero-enter pt-[var(--spacing-section)] pb-[clamp(3rem,2rem+3vw,5rem)]">
        <div className="max-w-[38rem]">
          <Eyebrow inverse>{eyebrow}</Eyebrow>
          <h1 id="hero-heading" className="text-display text-ivory mt-6">
            {heading}
          </h1>
          <p className="text-body-lg text-ivory/90 mt-6 max-w-[34rem]">{body}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href={primaryCta.href} variant="primary" inverse className="w-full sm:w-auto">
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              inverse
              accessibleLabel="Explore Reigate — learn what Reigate is"
              className="w-full sm:w-auto"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
