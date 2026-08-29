import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SocialIcon, type SocialIconName } from "@/components/ui/SocialIcon";
import { site } from "@/content/site";
import { footerNav, legalNav, connectNav } from "@/content/navigation";

interface SocialTarget {
  icon: SocialIconName;
  /** The accessible name. Icons carry none of their own. */
  label: string;
  href: string;
  external: boolean;
}

/** Email always; social only where a destination is confirmed (non-null in site config). */
function socialTargets(): SocialTarget[] {
  const { instagram, linkedin } = site.social;
  return [
    {
      icon: "email" as const,
      label: `Email ${site.inquiryEmail}`,
      href: `mailto:${site.inquiryEmail}`,
      external: false,
    },
    { icon: "linkedin" as const, label: "Reigate on LinkedIn", href: linkedin, external: true },
    { icon: "instagram" as const, label: "Reigate on Instagram", href: instagram, external: true },
  ].filter((t): t is SocialTarget => Boolean(t.href));
}

/**
 * An icon-only link. The icon is decorative, so the accessible name lives here — without it a
 * screen reader announces "link" and nothing else.
 *
 * The 44px box is on the link rather than the glyph: the mark reads better at 20px, and
 * shrinking the target to match it would put these under the minimum.
 */
function SocialLink({ target }: { target: SocialTarget }) {
  const className =
    "hover:text-ivory link-motion text-ivory/70 inline-flex h-11 w-11 items-center " +
    "justify-center rounded-sm focus-visible:outline-3";
  const glyph = <SocialIcon name={target.icon} className="h-5 w-5" />;

  if (!target.external) {
    return (
      <a href={target.href} aria-label={target.label} className={className}>
        {glyph}
      </a>
    );
  }
  return (
    <a
      href={target.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${target.label} (opens in a new tab)`}
      className={className}
    >
      {glyph}
    </a>
  );
}

/**
 * Global footer.
 *
 * Sits on **Ink**, not Olive. The final CTA band directly above it is the single Olive band,
 * and with the footer on the same colour the two merged into one tall green slab with no seam —
 * the close of the page and its base reading as one block. Two dark tones separate them while
 * keeping both inside the locked palette, and the heavier of the two sits underneath, so the
 * page settles onto a base rather than trailing off.
 */
export function Footer() {
  const social = socialTargets();

  return (
    <footer data-surface="inverse" className="bg-ink text-ivory">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/reigate-symbol-white.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11"
          />
          <p className="font-display mt-5 max-w-[22rem] text-[1.35rem] leading-snug">
            {site.brandIdea}
          </p>
          <p className="text-eyebrow text-ivory/70 mt-3 tracking-[0.14em] uppercase">
            {site.category}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-eyebrow text-ivory/70 font-semibold tracking-[0.14em] uppercase">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body text-ivory/90 hover:text-ivory link-motion underline-offset-4 hover:underline focus-visible:outline-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Connect">
          <h2 className="text-eyebrow text-ivory/70 font-semibold tracking-[0.14em] uppercase">
            Connect
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {connectNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body text-ivory/90 hover:text-ivory link-motion underline-offset-4 hover:underline focus-visible:outline-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Outdented so the row of icons optically aligns with the text above it. */}
          <ul className="mt-3 -ml-3 flex items-center gap-1">
            {social.map((target) => (
              <li key={target.href}>
                <SocialLink target={target} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* Legal row. Privacy, Terms and Accessibility sit beside the copyright because that is
          where people look for them, rather than buried in the Explore list.
          Three constraints hold this row: each nav needs an aria-label distinct from the others
          or axe reports a duplicate landmark; these are standalone nav links so the 44px target
          rule applies to each; and ivory/70 measures 5.25:1 on Olive and higher still on Ink,
          which is why that value is used rather than anything dimmer. */}
      <div className="border-ivory/15 border-t">
        <Container className="text-ivory/70 flex flex-col gap-x-6 gap-y-1 py-4 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex min-h-[44px] items-center">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-ivory link-motion inline-flex min-h-[44px] items-center underline-offset-4 hover:underline focus-visible:outline-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
