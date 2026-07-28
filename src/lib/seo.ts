import type { Metadata } from "next";
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
