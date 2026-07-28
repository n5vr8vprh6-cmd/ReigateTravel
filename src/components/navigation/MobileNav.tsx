"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/content/navigation";

/**
 * Accessible mobile navigation disclosure (< lg). Toggle button controls a panel:
 * - aria-expanded / aria-controls wired to the panel
 * - Escape closes and returns focus to the toggle
 * - focus moves into the panel on open; background scroll locked while open
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    // Move focus into the panel.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
        className="border-ink/20 text-ink inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border px-3 focus-visible:outline-3"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="text-sm font-semibold tracking-wide uppercase">
          {open ? "Close" : "Menu"}
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="bg-surface fixed inset-0 top-[var(--header-height,4.5rem)] z-40 px-6 pt-6 pb-10"
        >
          <nav aria-label="Primary (mobile)">
            <ul className="divide-taupe/40 flex flex-col divide-y">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-h3 text-ink flex min-h-[52px] items-center focus-visible:outline-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/begin-planning"
              onClick={() => setOpen(false)}
              className="bg-ink text-ivory mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-sm px-6 font-sans font-semibold focus-visible:outline-3"
            >
              Begin Planning
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
