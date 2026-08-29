import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VercelAnalytics } from "@/components/analytics/VercelAnalytics";
import { baseMetadata, baseViewport, organizationJsonLd } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${cormorant.variable} ${montserrat.variable}`}
      style={{ ["--header-height" as string]: "4.5rem" }}
    >
      <body className="bg-surface text-ink min-h-dvh antialiased">
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Structured data uses approved facts only (see lib/seo.ts).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {/* Renders nothing unless NEXT_PUBLIC_ANALYTICS is "true". Last in the body so it is
            the last thing considered, which is also how much weight it should carry. */}
        <VercelAnalytics />
      </body>
    </html>
  );
}
