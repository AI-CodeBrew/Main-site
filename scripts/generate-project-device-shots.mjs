/**
 * Generate Dialcom + Arabia Sales Bot device mockups (colored canvas style).
 * Usage: node --env-file=.env.local scripts/generate-project-device-shots.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "platform");

const MODEL = "gemini-3.1-flash-image";
const STYLE_BOOMERANG = path.join(OUT, "style-ref-boomerang.png");
const STYLE_ROOST = path.join(OUT, "style-ref-roost.jpg");
const ARABIA_LOGO = path.join(OUT, "arabia-sales-bot-logo.png");

const JOBS = [
  {
    name: "project-dialcom.jpg",
    aspectRatio: "16:9",
    imageSize: "2K",
    parts: async () => {
      const [boom, roost] = await Promise.all([
        readFile(STYLE_BOOMERANG),
        readFile(STYLE_ROOST),
      ]);
      return [
        { text: "STYLE REF A — device mockup on solid color canvas:" },
        { inlineData: { mimeType: "image/png", data: boom.toString("base64") } },
        { text: "STYLE REF B — laptop + phone on colored rounded background:" },
        { inlineData: { mimeType: "image/jpeg", data: roost.toString("base64") } },
        {
          text: `
Create a premium marketing mockup in the SAME FORMAT as the style refs:

CANVAS:
- Full-bleed 16:9.
- Solid OLIVE GREEN background (#556B2F / muted olive), rounded soft corners feel like the refs.
- Soft depth, clean studio look.

DEVICES:
- A modern laptop/browser window centered (or slightly left), showing a Dialcom AI voice / CRM / lending dashboard UI — light professional UI, call queue, KPIs, voice agent status.
- A smartphone to the right overlapping slightly, showing the same Dialcom product as a mobile app (calls, leads, booking).

BRANDING:
- Dialcom has NO logo asset — use clean bold text wordmark "Dialcom" in the website header and as a white pill badge at the bottom center: "● DIALCOM · VOICE AI CRM" (like the style refs).
- Do NOT invent a fake logo icon for Dialcom — text only.

QUALITY: Ultra sharp UI, readable text, no watermark, no FynkTech branding.
`,
        },
      ];
    },
  },
  {
    name: "project-arabia-sales-bot.jpg",
    aspectRatio: "16:9",
    imageSize: "2K",
    parts: async () => {
      const [boom, roost, logo] = await Promise.all([
        readFile(STYLE_BOOMERANG),
        readFile(STYLE_ROOST),
        readFile(ARABIA_LOGO),
      ]);
      return [
        { text: "STYLE REF A:" },
        { inlineData: { mimeType: "image/png", data: boom.toString("base64") } },
        { text: "STYLE REF B:" },
        { inlineData: { mimeType: "image/jpeg", data: roost.toString("base64") } },
        { text: "OFFICIAL Arabia Sales Bot logo — use this exact mark:" },
        { inlineData: { mimeType: "image/png", data: logo.toString("base64") } },
        {
          text: `
Create a premium marketing mockup in the SAME FORMAT as the style refs:

CANVAS:
- Full-bleed 16:9.
- Solid WARM ORANGE / terracotta background (#E86A33 or similar), rounded canvas feel.
- Soft depth like the refs.

DEVICES:
- Laptop/browser centered showing Arabia Sales Bot WhatsApp sales / order chatbot dashboard — chats, confirmed orders, AI replies.
- Smartphone on the right showing WhatsApp-style sales bot conversation UI.

BRANDING:
- Use the attached Arabia Sales Bot logo EXACTLY (red A + robot on black) in the site header / app chrome.
- Bottom center white pill: "● ARABIA SALES BOT · WHATSAPP AI" matching the style refs.

QUALITY: Ultra sharp, no watermark, no FynkTech branding, logo must match the attachment.
`,
        },
      ];
    },
  },
];

async function generate(job) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const parts = await job.parts();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY.trim(),
    },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: job.aspectRatio,
          imageSize: job.imageSize,
        },
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${job.name}: ${res.status} ${JSON.stringify(data).slice(0, 700)}`);
  for (const part of data?.candidates?.[0]?.content?.parts || []) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      const buf = Buffer.from(inline.data, "base64");
      const out = path.join(OUT, job.name);
      await writeFile(out, buf);
      console.log(`Wrote ${out} (${buf.length} bytes)`);
      return;
    }
  }
  throw new Error(`No image for ${job.name}: ${JSON.stringify(data).slice(0, 400)}`);
}

async function main() {
  if (!process.env.GEMINI_API_KEY?.trim()) throw new Error("Missing GEMINI_API_KEY");
  await mkdir(OUT, { recursive: true });
  for (const job of JOBS) await generate(job);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
