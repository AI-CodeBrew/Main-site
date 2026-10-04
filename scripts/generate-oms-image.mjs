/**
 * Regenerate the OMS dashboard showcase image.
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
Design a brand-new FynkTech Order Management System (OMS) product screenshot for a marketing website.

Use the attached image only as loose product context (order ops dashboard). Do NOT copy its layout 1:1.
Create a cleaner, more premium, more modern revamp.

COMPOSITION (full-bleed UI, 16:9, edge-to-edge):
- NO laptop/phone mockup, NO desk photo, NO browser chrome, NO watermarks, NO marketing slogans outside the UI.
- Dark navy shell (#0A0045) with a bright content canvas.
- Slim left icon rail + top bar with wordmark "FynkTech" and small "OMS" pill.
- Top modules: OMS (active), WMS, FMS — minimal segmented control.

DASHBOARD CONTENT (must feel real and useful):
1) Header row: title "Orders" + subtitle "Live queue across all channels" + primary button "New order" and a compact search field.
2) Four large KPI tiles only (not six): Orders today, Awaiting confirm, In transit, Delivered — strong typography, subtle icons, cyan (#01B4D2) accent on one key metric.
3) Main panel: modern orders table with columns Order ID, Channel, Customer, Status, COD, Updated.
   - 6–7 realistic rows
   - Channels: Shopify, Noon, WhatsApp, Website
   - Status chips: Confirmed, Packed, Out for delivery, Delivered, On hold
   - Clean zebra-free spacing, soft borders, excellent hierarchy
4) Right side mini panel (about 30% width): "Today" card with a small sparkline / mini bar chart for hourly orders + 2 short activity lines (e.g. "COD verified · #FT-1842", "Routed to Lahore WH").

VISUAL STYLE:
- Premium SaaS / Linear + Stripe-inspired craft: generous whitespace, 12–16px radius cards, hairline borders, soft elevation.
- Typography: sharp sans, bold numbers, muted labels.
- Accent cyan sparingly; status colors calm and intentional (green/amber/blue).
- Looks production-ready for a high-end agency landing page split section (image sits on the right of text).
- Photoreal UI rendering, crisp, high resolution, no blurry text if possible.
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
  console.log(`Wrote ${sitePath} (${buffer.length} bytes, ${mime})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
