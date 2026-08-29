import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All Version 1 imagery is local, optimized editorial PNG. No remote patterns.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires every quality passed to next/image to be declared here.
    // 75 is next/image's default and what every component except one relies on;
    // 58 is the deliberate lower setting on the ScrollSequence sprite strip
    // (see the comment above `quality={58}` in ScrollSequence.tsx).
    qualities: [58, 75],
  },
  experimental: {
    // Route changes are same-document under the App Router, so the CSS-only
    // `@view-transition` at-rule never fires -- that rule covers cross-document navigation.
    // This flag hands route transitions to React's ViewTransition, which needs no custom
    // JavaScript and no dependency, keeping motion declarative like the rest of the site.
    // Experimental, and deliberately the only experimental flag here: if it misbehaves,
    // delete these three lines and nothing else changes.
    viewTransition: true,
  },
  // Fail the production build on type or lint errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
