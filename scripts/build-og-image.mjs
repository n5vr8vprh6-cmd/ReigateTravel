/**
 * Render the 1200×630 Open Graph card to `src/app/opengraph-image.jpg`.
 *
 * The card is the homepage hero, re-cropped. That is the whole idea: a share preview should
 * look like the page it links to, and reproducing the hero means the card invents nothing.
 * Every element already ships on `/` — the approved coastline photograph, the approved white
 * symbol, the signature horizon rule, and `site.brandIdea` as the headline. Nothing here is a
 * new claim, a new image, or a new piece of copy.
 *
 * Why a committed PNG rather than `next/og`'s `ImageResponse`: Satori would need Cormorant and
 * Montserrat shipped as raw font files in the repo, and it does its own text layout rather than
 * the browser's. Rendering in headless Chromium uses the real fonts and the real engine, and
 * `src/app/opengraph-image.jpg` is a first-class Next file convention — it emits `og:image` plus
 * the width/height/type tags with no runtime cost at all. Same headless-Chromium approach as
 * `extract-sequence.mjs`, and the same `file://` requirement applies: the page must be served
 * from `file://` inside the repo so its relative paths reach `public/`.
 *
 * Copy is read out of `src/content/site.ts` rather than retyped, so the card cannot quietly
 * drift from the site. If that file is restructured this script fails loudly instead of
 * baking a stale sentence into an image nobody re-reads.
 *
 * Regenerate after changing the hero image, the brand idea, or the category:
 *   node scripts/build-og-image.mjs
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = process.cwd();
// JPEG, not PNG: this is a photograph, and the same card encodes to ~90KB here against 651KB
// as a PNG. Next's file convention accepts either and emits the right `og:image:type`.
const OUT = path.join(ROOT, "src/app/opengraph-image.jpg");
const WIDTH = 1200;
const HEIGHT = 630;

/** Pull an approved string out of site.ts. Throwing beats silently shipping a stale card. */
function siteValue(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*\n?\\s*"([^"]+)"`));
  if (!match) throw new Error(`site.ts no longer exposes "${key}" as a plain string literal`);
  return match[1];
}

const siteSource = readFileSync(path.join(ROOT, "src/content/site.ts"), "utf8");
const brandIdea = siteValue(siteSource, "brandIdea");
const category = siteValue(siteSource, "category");

// Values below are lifted from globals.css and the hero so the card matches the page exactly:
// the scrim ramp is EditorialHero's verbatim, Ivory/Taupe are the palette, and the rule path is
// HorizonRule's. The headline is 74px rather than the hero's 96px because the card is 630px tall
// and has to hold two lines plus the eyebrow without crowding the frame.
const html = `<!doctype html>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Montserrat:wght@600&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #1b1b1b;
    /* Greyscale antialiasing, matching the site's own 'antialiased' body class. Subpixel AA
       leaves colour fringes on the glyph edges, and social platforms rescale this PNG. */
    -webkit-font-smoothing: antialiased;
  }
  .card { position: relative; width: ${WIDTH}px; height: ${HEIGHT}px; isolation: isolate; }
  .photo {
    position: absolute; inset: 0; z-index: -2;
    width: 100%; height: 100%;
    object-fit: cover; object-position: 62% 34%;
  }
  .scrim {
    position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(to top,
      rgba(27,27,27,0.92) 0%, rgba(27,27,27,0.88) 45%,
      rgba(27,27,27,0.74) 62%, rgba(27,27,27,0.35) 80%, rgba(27,27,27,0.15) 100%);
  }
  .symbol { position: absolute; right: 64px; bottom: 64px; width: 66px; height: 66px; }
  /* 510px is the hero's 608-in-1440 copy column scaled to this card (42% of the width). It is
     not arbitrary: it is what makes the headline break "Travel is part / of living well." the
     way it does on the page. At 720px it set one long line and orphaned "well." underneath. */
  .copy { position: absolute; left: 64px; bottom: 64px; max-width: 510px; }
  .eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-family: Montserrat, sans-serif; font-weight: 600; font-size: 15px;
    text-transform: uppercase; letter-spacing: 0.14em; color: rgba(246,242,237,0.8);
  }
  .headline {
    margin-top: 22px;
    font-family: "Cormorant Garamond", serif; font-weight: 500;
    font-size: 74px; line-height: 1.02; letter-spacing: -0.02em; color: #f6f2ed;
  }
</style>
<div class="card">
  <img class="photo" src="public/images/hero-coast.png" alt="">
  <div class="scrim"></div>
  <img class="symbol" src="public/brand/reigate-symbol-white.png" alt="">
  <div class="copy">
    <p class="eyebrow">
      <svg width="46" height="8" viewBox="0 0 96 8" fill="none">
        <path d="M0 4 H40 C44 4 45 1 48 1 C51 1 52 4 56 4 H96"
              stroke="#a79886" stroke-width="1" stroke-linecap="round"/>
      </svg>
      <span>${category}</span>
    </p>
    <h1 class="headline">${brandIdea}</h1>
  </div>
</div>`;

// Written into the repo root, not a temp dir: the relative `public/...` paths above only
// resolve if the host page sits at the same level they are written against.
const hostPage = path.join(ROOT, ".og-card.html");
writeFileSync(hostPage, html);

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
try {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(hostPage).href, { waitUntil: "networkidle" });
  // Webfonts render as a fallback face until they are decoded, and the screenshot does not
  // wait for them on its own — without this the headline can ship in Times.
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: OUT, type: "jpeg", quality: 88 });
  await page.close();
  console.log(`wrote ${path.relative(ROOT, OUT)} (${WIDTH}×${HEIGHT})`);
} finally {
  await browser.close();
  unlinkSync(hostPage);
}
