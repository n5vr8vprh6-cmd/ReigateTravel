import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { site } from "@/content/site";
import { footerNav } from "@/content/navigation";

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
                  className="text-body text-ivory/90 hover:text-ivory underline-offset-4 hover:underline focus-visible:outline-3"
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
                className="text-body text-ivory/90 hover:text-ivory underline-offset-4 hover:underline focus-visible:outline-3"
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
                  className="text-body text-ivory/90 hover:text-ivory underline-offset-4 hover:underline focus-visible:outline-3"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-ivory/15 border-t">
        <Container className="text-ivory/70 flex flex-col gap-2 py-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="tracking-[0.14em] uppercase">{site.category}</p>
        </Container>
      </div>
    </footer>
  );
}
