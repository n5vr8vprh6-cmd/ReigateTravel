/** Keyboard skip link — visually hidden until focused, then anchored top-left. */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="bg-ink text-ivory sr-only rounded-sm px-4 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
    >
      Skip to main content
    </a>
  );
}
