/**
 * Extract evenly-spaced frames from a video into one vertical sprite strip.
 *
 * No ffmpeg. It is not installed and adding a system package unasked is not on — so the clip is
 * loaded in a headless Chromium page, seeked frame by frame, each frame drawn into a tall canvas,
 * and the whole strip exported once. This is the same approach used for the stairs and sailboat
 * sequences (decision-log #47).
 *
 * Two things are load-bearing:
 *
 * 1. `--allow-file-access-from-files`, AND the page itself must be served from `file://`. On
 *    `about:blank` a `file://` video is cross-origin no matter what flags are set, and the load
 *    simply fails; from a `file://` host page in the same directory it loads and the canvas stays
 *    untainted, so `toDataURL` works. Both halves are needed.
 * 2. Seeking is awaited per frame. `currentTime = x` is asynchronous; drawing before `seeked`
 *    fires silently duplicates the previous frame, which reads as a stutter in the scrub rather
 *    than as an error.
 *
 * Usage:
 *   node scripts/extract-sequence.mjs <input.mp4> <output.jpg> [frames] [width]
 *
 * The frame count must be one the stylesheet has a rule for — `steps()` cannot take a custom
 * property, so `globals.css` keys the step count off `data-frames` and only 20 and 24 exist.
 */
import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";
import { writeFileSync, unlinkSync } from "node:fs";
import path from "node:path";

const [input, output, framesArg = "24", widthArg = "1024"] = process.argv.slice(2);
if (!input || !output) {
  console.error(
    "usage: node scripts/extract-sequence.mjs <input.mp4> <output.jpg> [frames] [width]"
  );
  process.exit(1);
}
const FRAMES = Number(framesArg);
const WIDTH = Number(widthArg);

if (![20, 24].includes(FRAMES)) {
  console.error(`frames must be 20 or 24 — globals.css has no steps() rule for ${FRAMES}.`);
  process.exit(1);
}

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();

// A host page beside the clip, so the video is same-directory rather than cross-origin.
const hostPath = path.join(path.dirname(path.resolve(input)), "._extract-host.html");
writeFileSync(hostPath, "<!doctype html><meta charset=utf-8><title>extract</title>");
await page.goto(pathToFileURL(hostPath).href);

const result = await page.evaluate(
  async ({ src, frames, width }) => {
    const video = document.createElement("video");
    video.src = src;
    video.muted = true;
    video.playsInline = true;

    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = () => reject(new Error("could not load the video"));
    });

    const height = Math.round((width * video.videoHeight) / video.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height * frames;
    const cx = canvas.getContext("2d");

    // Stop just short of the end: the final moments of a generated clip often hold or fade,
    // and a duplicated last frame shows up as the scrub sticking.
    const span = video.duration * 0.96;

    for (let i = 0; i < frames; i++) {
      const t = (span * i) / (frames - 1);
      await new Promise((resolve) => {
        video.onseeked = resolve;
        video.currentTime = t;
      });
      cx.drawImage(video, 0, i * height, width, height);
    }

    return {
      dataUrl: canvas.toDataURL("image/jpeg", 0.58),
      frameWidth: width,
      frameHeight: height,
      duration: video.duration,
      source: `${video.videoWidth}x${video.videoHeight}`,
    };
  },
  { src: path.basename(path.resolve(input)), frames: FRAMES, width: WIDTH }
);

unlinkSync(hostPath);

writeFileSync(output, Buffer.from(result.dataUrl.split(",")[1], "base64"));
await browser.close();

const bytes = Buffer.from(result.dataUrl.split(",")[1], "base64").length;
console.log(`source        ${result.source}, ${result.duration.toFixed(2)}s`);
console.log(`frame         ${result.frameWidth}x${result.frameHeight}`);
console.log(
  `strip         ${result.frameWidth}x${result.frameHeight * FRAMES}  (${FRAMES} frames)`
);
console.log(`written       ${output}  ${(bytes / 1024).toFixed(0)}KB`);
console.log("");
console.log("Wire it up with:");
console.log(
  `  frames={${FRAMES}} frameWidth={${result.frameWidth}} frameHeight={${result.frameHeight}}`
);
