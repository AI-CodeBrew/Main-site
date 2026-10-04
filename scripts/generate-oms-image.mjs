/**
 * Generate OMS showcase as a PC/laptop product shot.
 * Usage: node --env-file=.env.local scripts/generate-oms-image.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "platform");
const REF_CANDIDATES = [
  path.join(OUT_DIR, "oms-dashboard-ref.png"),
  path.join(OUT_DIR, "oms-dashboard.png"),
];

const MODEL = "gemini-3.1-flash-image";
const ASPECT = "16:9";
const IMAGE_SIZE = "2K";

const PROMPT = `
Create a premium marketing product photo of a modern laptop / PC showing an Order Management System (OMS) dashboard on screen.

Use the attached image as the UI that appears ON THE LAPTOP SCREEN (same OMS product: orders queue, KPI cards, table, Today panel). Redesign the screen UI cleanly if needed, but keep it clearly an OMS.

COMPOSITION:
- A realistic modern laptop (MacBook-like or thin PC) centered / slightly angled, filling most of the frame.
- The OMS dashboard is sharp and readable on the laptop display.
- Soft studio background: light grey / soft off-white gradient, subtle depth — NOT a messy desk collage.
- Thin laptop bezel, keyboard faintly visible at bottom, no giant props stealing focus.
- Optional soft shadow under the laptop.
- Full-bleed 16:9. Edge-to-edge. High-end agency quality.

HARD RULES:
- Do NOT show any "FynkTech" logo, wordmark, or company brand name on the laptop or in the UI.
- No watermarks, no poster frames, no extra floating UI cards outside the laptop.
- No phone / second device — laptop/PC only.
- Screen UI: dark navy chrome + light content, OMS / WMS / FMS tabs, Orders title, KPI row, orders table, Today panel.
`;

async function loadRef() {
  for (const candidate of REF_CANDIDATES) {
    try {
      const buf = await readFile(candidate);
      return { buf, path: candidate };
    } catch {
      // try next
    }
  }
  throw new Error("No OMS reference image found in public/platform");
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  await mkdir(OUT_DIR, { recursive: true });
  const { buf: refBuf, path: refPath } = await loadRef();
  console.log(`Loaded reference ${refPath} (${refBuf.length} bytes)`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: refPath.endsWith(".jpg") ? "image/jpeg" : "image/png",
                data: refBuf.toString("base64"),
              },
            },
            { text: PROMPT },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: ASPECT,
          imageSize: IMAGE_SIZE,
        },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gemini ${res.status}: ${JSON.stringify(data).slice(0, 600)}`);
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  let buffer = null;
  let mime = "image/png";
  for (const part of parts) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      buffer = Buffer.from(inline.data, "base64");
      mime = inline.mimeType || inline.mime_type || mime;
      break;
    }
  }
  if (!buffer) {
    throw new Error(`No image in response: ${JSON.stringify(data).slice(0, 500)}`);
  }

  const sitePath = path.join(OUT_DIR, "oms-dashboard.png");
  await writeFile(sitePath, buffer);
  // Also keep a clear PC-named copy.
  await writeFile(path.join(OUT_DIR, "oms-pc.png"), buffer);
  console.log(`Wrote ${sitePath} + oms-pc.png (${buffer.length} bytes, ${mime})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
