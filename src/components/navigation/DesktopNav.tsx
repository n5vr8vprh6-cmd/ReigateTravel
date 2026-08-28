import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/content/navigation";

/** Desktop primary navigation + the Begin Planning conversion. Hidden below lg. */
export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
      <ul className="flex items-center gap-7">
        {primaryNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-ink hover:text-olive link-motion font-sans text-[0.9375rem] font-medium underline-offset-4 hover:underline focus-visible:outline-3"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Button href="/begin-planning" variant="primary" className="px-5 py-2.5">
        Begin Planning
      </Button>
    </nav>
  );
}
