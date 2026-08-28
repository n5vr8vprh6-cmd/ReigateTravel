import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { site } from "@/content/site";
import { footerNav, legalNav } from "@/content/navigation";

/** External social links, rendered only when a destination is confirmed (non-null). */
function socialLinks() {
  const { instagram, linkedin, substack } = site.social;
  return [
    { label: "Instagram", href: instagram },
    { label: "LinkedIn", href: linkedin },
    { label: site.social.substackPublicationName, href: substack },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));
}

/** Global footer on the Olive band. Utility + legal nav, confirmed social links, contact. */
export function Footer() {
  const social = socialLinks();

  return (
    <footer data-surface="inverse" className="bg-surface-inverse text-ivory">
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

        <div>
          <h2 className="text-eyebrow text-ivory/70 font-semibold tracking-[0.14em] uppercase">
            Connect
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <a
                href={`mailto:${site.inquiryEmail}`}
                className="text-body text-ivory/90 hover:text-ivory link-motion underline-offset-4 hover:underline focus-visible:outline-3"
              >
                {site.inquiryEmail}
              </a>
            </li>
            {social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-ivory/90 hover:text-ivory link-motion underline-offset-4 hover:underline focus-visible:outline-3"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Legal row. Privacy, Terms and Accessibility sit beside the copyright because that is
          where people look for them, rather than buried in the Explore list.
          Three constraints hold this row: the nav needs an aria-label distinct from the
          "Footer" nav above or axe reports a duplicate landmark; these are standalone nav
          links so the 44px target rule applies to each; and ivory/70 on Olive measures
          5.25:1, which is why that value is used rather than anything dimmer.
          The category line that used to sit here was dropped - it already appears in the
          brand column directly above, and three items crowd this row at 390px. */}
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
