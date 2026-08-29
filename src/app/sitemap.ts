import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { primaryNav, footerNav, legalNav, connectNav } from "@/content/navigation";

/** Sitemap foundation. Home + every internal route in the Charter sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/begin-planning",
    ...primaryNav.map((item) => item.href),
    ...footerNav.map((item) => item.href),
    ...legalNav.map((item) => item.href),
    ...connectNav.map((item) => item.href),
  ];
  const unique = Array.from(new Set(routes));
  const lastModified = new Date();

  return unique.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.6,
  }));
}
