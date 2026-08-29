export type SocialIconName = "email" | "linkedin" | "instagram";

/**
 * Three marks, drawn inline rather than pulled from an icon library.
 *
 * This project runs on exactly four dependencies and has rejected one before on weight
 * (decision-log #26). An icon package for three glyphs would be a fifth, and tree-shaking a
 * whole set down to three marks still costs more than 30 lines of path data.
 *
 * Every icon is `aria-hidden`: an icon carries no accessible name, so the link around it must
 * supply one. `SocialLink` in the footer does that, and the icons are never used bare.
 */
export function SocialIcon({ name, className }: { name: SocialIconName; className?: string }) {
  const shared = {
    className,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  } as const;

  if (name === "email") {
    return (
      <svg {...shared} fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M3 6.5l9 6.5 9-6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...shared} fill="currentColor">
        <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-4.9c0-1.17-.02-2.67-1.7-2.67-1.7 0-1.96 1.27-1.96 2.59V21h-4z" />
      </svg>
    );
  }

  return (
    <svg {...shared} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
