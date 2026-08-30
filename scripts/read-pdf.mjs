/**
 * Read text out of a PDF, including ones that use Type0 (CID) fonts.
 *
 * This exists because the project's own sources of truth are PDFs, and until now some of them
 * could not be read here at all. `missing-inputs.md` records the Brand Book as unreadable —
 * "a PDF with subset fonts that cannot be read in this environment" — and the client's supplied
 * bio and privacy policy landed in the same shape.
 *
 * Simple extractors read `(literal)` strings and come back with nothing from these files,
 * because a composite font encodes text as hex CIDs that mean nothing without the font's own
 * ToUnicode CMap. So: inflate every stream, build a CID -> Unicode map from the bfchar/bfrange
 * tables, then decode the text operators through it.
 *
 * No dependency — `zlib` is in Node's standard library, so this costs nothing against the
 * four-dependency budget. It is a dev tool and is never imported by the app.
 *
 * Usage:
 *   node scripts/read-pdf.mjs <file.pdf> [more.pdf ...]
 *
 * Caveats worth knowing before trusting the output: it recovers text, not layout, so reading
 * order across multi-column pages can interleave. Anything without a ToUnicode CMap still comes
 * back empty — that is a real limit, not a bug to chase.
 */
import { readFileSync } from "node:fs";
import zlib from "node:zlib";

function inflateStreams(buf) {
  const latin = buf.toString("latin1");
  const streams = [];
  const re = /stream\r?\n/g;
  let m;
  while ((m = re.exec(latin)) !== null) {
    const start = m.index + m[0].length;
    const end = latin.indexOf("endstream", start);
    if (end < 0) continue;
    const raw = buf.subarray(start, end);
    try {
      streams.push(zlib.inflateSync(raw).toString("latin1"));
    } catch {
      try {
        streams.push(zlib.inflateRawSync(raw).toString("latin1"));
      } catch {
        /* not a flate stream — images, fonts, metadata */
      }
    }
  }
  return streams;
}

/** UTF-16BE hex (the CMap destination format) to a JS string. */
function hexToStr(h) {
  let s = "";
  for (let i = 0; i + 3 < h.length + 1; i += 4) {
    s += String.fromCharCode(parseInt(h.substr(i, 4), 16));
  }
  return s;
}

function buildToUnicode(streams) {
  const map = new Map();
  for (const s of streams) {
    if (!/beginbfchar|beginbfrange/.test(s)) continue;
    for (const blk of s.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
      for (const p of blk[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
        map.set(parseInt(p[1], 16), hexToStr(p[2]));
      }
    }
    for (const blk of s.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
      for (const p of blk[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
        const lo = parseInt(p[1], 16);
        const hi = parseInt(p[2], 16);
        const dst = parseInt(p[3], 16);
        for (let c = lo; c <= hi && c - lo < 65535; c++)
          map.set(c, String.fromCharCode(dst + (c - lo)));
      }
    }
  }
  return map;
}

const decodeHex = (h, map) => {
  let out = "";
  for (let i = 0; i + 1 < h.length; i += 4) out += map.get(parseInt(h.substr(i, 4), 16)) ?? "";
  return out;
};

/** Literal `(...)` strings, for the simpler PDFs that do not use CID fonts. */
const decodeLiteral = (s) =>
  s
    .replace(/\\([()\\])/g, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\(\d{1,3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)));

export function readPdf(path) {
  const streams = inflateStreams(readFileSync(path));
  const map = buildToUnicode(streams);
  const parts = [];
  for (const s of streams) {
    if (!/T[jJ]/.test(s) || /beginbfchar|beginbfrange/.test(s)) continue;
    const ops =
      /<([0-9A-Fa-f\s]+)>\s*Tj|\(((?:\\.|[^\\()])*)\)\s*Tj|\[([\s\S]*?)\]\s*TJ|(T\*|Td|TD|ET)/g;
    for (const t of s.matchAll(ops)) {
      if (t[1] !== undefined) parts.push(decodeHex(t[1].replace(/\s/g, ""), map));
      else if (t[2] !== undefined) parts.push(decodeLiteral(t[2]));
      else if (t[3] !== undefined) {
        for (const h of t[3].matchAll(/<([0-9A-Fa-f\s]+)>|\(((?:\\.|[^\\()])*)\)/g)) {
          parts.push(
            h[1] !== undefined ? decodeHex(h[1].replace(/\s/g, ""), map) : decodeLiteral(h[2])
          );
        }
      } else parts.push("\n");
    }
  }
  return { text: parts.join(""), glyphs: map.size };
}

if (process.argv.length > 2) {
  for (const f of process.argv.slice(2)) {
    const { text, glyphs } = readPdf(f);
    const clean = text
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    console.log("\n================= " + f.split(/[\\/]/).pop() + " =================");
    console.log("glyphs mapped: " + glyphs + "   characters: " + clean.length + "\n");
    console.log(clean);
  }
}
