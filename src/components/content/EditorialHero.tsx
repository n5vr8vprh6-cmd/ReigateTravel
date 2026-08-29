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
 * region where the scrim is at least 74% opaque, so the guarantee holds for any image
 * placed here.
 *
 * **Everything here answers to scroll.** An ambient Kling video used to loop over the still,
 * and it was the only motion on the page running on its own clock — which is precisely what
 * made the hero feel like a movie playing rather than a composition responding to the
 * visitor. It is gone (−6.3MB, one fewer client component). In its place the hero's own
 * elements separate at different rates as it exits, on the same `--hero-frame` view timeline
 * as the photograph's push-in, so the whole thing reassembles exactly in reverse on scroll-up.
 *
 * `bg-ink` on the section is the structural dark ground. Every dark pixel here otherwise comes from
 * the photograph and the -z-10 scrim, and neither of those is an *ancestor* background — so
 * resolving the ancestor chain for an opaque colour lands on body's Ivory, which puts the Ivory
 * copy at 1.0:1. It renders identically today. What it buys is that the contrast guarantee survives
 * any state where the image or the scrim does not paint, rather than depending on both.
 */
export function EditorialHero() {
  const { eyebrow, heading, body, primaryCta, secondaryCta, image } = home.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      data-surface="inverse"
      className="hero-frame bg-ink relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Two framings, because one does not survive both aspect ratios. The photograph is 3:2
          and the hero is 100svh, so a phone crops it to roughly a third of its width — and at
          62% that window opens at source x545, which lands inside the subject's face. Below
          `sm` the window recentres to put her head on the left third with lead room ahead of
          her gaze; from `sm` up the frame is wide enough that 62% reads as composed. Only the
          horizontal value differs: at these heights object-cover fills the height exactly, so
          the vertical value is inert on a phone and still does its work on a wide viewport. */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="hero-drift absolute inset-0 -z-20 object-cover object-[50%_34%] sm:object-[62%_34%]"
      />
      {/* Contrast scrim — an opacity ramp, not a decorative gradient. It holds at >=0.74
          across the full height of the copy block and only falls away above it, so the
          upper third of the photograph still reads. Deliberately NOT animated: the copy is
          already leaving the viewport by the time it would matter, and any scroll animation
          on the scrim risks landing on less coverage than the measured 5.34:1 baseline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(27,27,27,0.92)_0%,rgba(27,27,27,0.88)_45%,rgba(27,27,27,0.74)_62%,rgba(27,27,27,0.35)_80%,rgba(27,27,27,0.15)_100%)]"
      />

      <Container className="hero-enter pt-[var(--spacing-section)] pb-[clamp(3rem,2rem+3vw,5rem)]">
        {/* Each child carries its own `hero-layer` depth. As the hero scrolls away they
            separate — eyebrow travelling furthest, CTAs least — and converge again on the
            way back up. `translate` is used for this so it composes with the `transform`
            that hero-enter animates on load instead of one clobbering the other. */}
        {/* Two animations, two elements, deliberately. The scroll lift sits on the outer
            `.hero-layer` wrappers; the load entrance sits on the element inside each one.
            Putting both on the same element does not work — `animation` is a single
            property, and the first attempt silently lost a specificity fight with the
            load rule, leaving the layers static while looking correct in the CSS. */}
        <div className="max-w-[38rem]">
          <div className="hero-layer" data-depth="1">
            <Eyebrow inverse>{eyebrow}</Eyebrow>
          </div>
          <div className="hero-layer" data-depth="2">
            <h1 id="hero-heading" className="text-display text-ivory mt-6">
              {heading}
            </h1>
          </div>
          <div className="hero-layer" data-depth="3">
            {/* Narrower than the 38rem column on purpose — the lead should taper under the
                headline rather than match it. 34rem measured 48 characters, which is inside
                the 45–75 band but at the very bottom of it; 36rem holds the taper and reads
                at ~53. */}
            <p className="text-body-lg text-ivory/90 mt-6 max-w-[36rem]">{body}</p>
          </div>
          <div className="hero-layer" data-depth="4">
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
        </div>
      </Container>

      {/* Scroll cue. The hero is a full 100svh, so the fold needs to say there is more. */}
      <div
        aria-hidden="true"
        className="hero-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="bg-ivory/50 block h-10 w-px" />
      </div>
    </section>
  );
}
