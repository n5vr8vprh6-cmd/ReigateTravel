import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";

/**
 * Global header. Uses the approved circular secondary mark for this narrow digital space
 * (Brand Book ch. 38). The logo is a source PNG used as-is — never redrawn or recoloured.
 */
export function Header() {
  return (
    <header className="border-taupe/40 bg-surface/90 sticky top-0 z-30 border-b backdrop-blur-sm">
      {/* var() form + fallback, matching MobileNav. Without var() this compiled to invalid
          CSS and the header collapsed to content height (48.75px), leaving the mobile nav
          panel offset against a header that was not the 4.5rem it assumed. */}
      <Container className="flex h-[var(--header-height,4.5rem)] items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center focus-visible:outline-3"
          aria-label="Reigate Travel & Co. — home"
        >
          <Image
            src="/brand/reigate-circular.png"
            alt="Reigate Travel & Co."
            width={48}
            height={48}
            priority
            className="h-12 w-12"
          />
        </Link>
        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
}
