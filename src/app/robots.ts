import type { MetadataRoute } from "next";
import { indexingAllowed, siteUrl } from "@/lib/seo";

/**
 * Environment-aware robots. Only the approved production deployment (with
 * NEXT_PUBLIC_ALLOW_INDEXING=true) permits crawling; every preview stays disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
