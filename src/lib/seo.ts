import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";

/** True only when explicitly allowed (approved production). Protects preview deployments. */
export const indexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/** Base metadata applied site-wide; pages extend the title via the template. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.category}`,
    template: `%s — ${site.name}`,
  },
  description: site.brandPromise,
  applicationName: site.name,
  robots: indexingAllowed
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.category}`,
    description: site.brandPromise,
    url: siteUrl,
    locale: "en_CA",
  },
  alternates: {
    canonical: "/",
  },
};

/**
 * `themeColor` has to live on a `viewport` export — the App Router warns and drops it when it
 * appears in `metadata`. One value rather than a light/dark pair, because there is no dark theme:
 * serving Ink under `prefers-color-scheme: dark` would paint dark browser chrome directly above an
 * Ivory header. Ivory is what sits at the very top of every page, so the chrome meets the header
 * without a seam. Kept here so the browser-chrome colour and the page metadata stay in one file.
 */
export const baseViewport: Viewport = {
  themeColor: "#f6f2ed", // Ivory — --color-surface in globals.css
};

/**
 * Organization + founder structured data. Only verifiable, approved facts:
 * name, url, category, contact email, confirmed social profiles, and the founder's name.
 * No unverifiable claims (no ratings, awards, counts, or founding dates).
 */
export function organizationJsonLd() {
  const sameAs = [site.social.instagram, site.social.linkedin, site.social.substack].filter(
    (url): url is string => Boolean(url)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.brandPromise,
    url: siteUrl,
    email: site.inquiryEmail,
    slogan: site.brandIdea,
    ...(sameAs.length ? { sameAs } : {}),
    founder: {
      "@type": "Person",
      name: "Tyler",
      jobTitle: "Founder & Travel Advisor",
    },
    areaServed: "Greater Toronto Area",
  };
}

/**
 * FAQPage structured data.
 *
 * Built from the same content the page renders, never from a separate list — search engines
 * require the answers to be visible on the page, and two sources would drift. Same restraint as
 * the organization block above: it describes what is on the page and asserts nothing extra.
 */
export function faqJsonLd(groups: readonly { items: readonly { q: string; a: string }[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };
}
