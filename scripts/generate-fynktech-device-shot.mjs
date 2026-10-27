/**
 * FynkTech device mockup in the same style as Dialcom / Arabia Sales Bot.
 * Usage: node --env-file=.env.local scripts/generate-fynktech-device-shot.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "platform");

const MODEL = "gemini-3.1-flash-image";
const STYLE_DIALCOM = path.join(OUT, "project-dialcom.jpg");
const STYLE_ARABIA = path.join(OUT, "project-arabia-sales-bot.jpg");
const PLATFORM = path.join(OUT, "fynktech-platform-desktop-v2.jpg");
const LOGO = path.join(OUT, "fynktech-logo-hq.jpg");

async function main() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  await mkdir(OUT, { recursive: true });
  const [dialcom, arabia, platform, logo] = await Promise.all([
    readFile(STYLE_DIALCOM),
    readFile(STYLE_ARABIA),
    readFile(PLATFORM),
    readFile(LOGO),
  ]);

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
            { text: "STYLE REF 1 — Dialcom device mockup on solid color (match this FORMAT):" },
            { inlineData: { mimeType: "image/jpeg", data: dialcom.toString("base64") } },
            { text: "STYLE REF 2 — Arabia device mockup on solid color (match this FORMAT):" },
            { inlineData: { mimeType: "image/jpeg", data: arabia.toString("base64") } },
            { text: "CONTENT — FynkTech platform UI to show on the laptop/phone screens:" },
            { inlineData: { mimeType: "image/jpeg", data: platform.toString("base64") } },
            { text: "OFFICIAL FynkTech logo — use this exact mark:" },
            { inlineData: { mimeType: "image/jpeg", data: logo.toString("base64") } },
            {
              text: `
Create a premium marketing mockup in the SAME FORMAT as Dialcom / Arabia refs:

CANVAS:
- Full-bleed 16:9.
- Solid DEEP TEAL / cyan-green background (#0F766E or similar rich teal), rounded soft canvas feel like the refs.
- Soft studio depth.

DEVICES:
- Modern laptop centered/left showing the FynkTech AI platform dashboard from the CONTENT image (sidebar, KPIs, sales chart, floating feature cards feel — clean SaaS UI on screen).
- Smartphone on the right overlapping slightly, showing a mobile version of the same FynkTech product.

BRANDING:
- Use the official FynkTech logo (navy circle + white F) in the site header / chrome.
- Bottom center white pill: "● FYNKTECH · AI AGENTS & AUTOMATION" (same pill style as the refs).

QUALITY: Ultra sharp, readable UI, no watermark. Match Dialcom/Arabia composition closely — only change brand, UI content, and background color to teal.
`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K",
        },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${JSON.stringify(data).slice(0, 700)}`);

  for (const part of data?.candidates?.[0]?.content?.parts || []) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      const buf = Buffer.from(inline.data, "base64");
      const out = path.join(OUT, "project-fynktech.jpg");
      await writeFile(out, buf);
      console.log(`Wrote ${out} (${buf.length} bytes)`);
      return;
    }
  }
  throw new Error(`No image: ${JSON.stringify(data).slice(0, 400)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
