/**
 * Generate FynkTech platform showcase (desktop + mobile) from composition + official logo.
 * Usage: node --env-file=.env.local scripts/generate-platform-hero-image.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "platform");

const SCENE_REF = path.join(
  process.env.HOME || "",
  ".cursor/projects/Users-macbook-Documents-Projects-Website/assets/image-677c6356-130c-454b-8496-28e0e1c230e8.jpg",
);
const LOGO_REF = path.join(ROOT, "public", "platform", "fynktech-logo-hq.jpg");
const LOGO_MARK_REF = path.join(
  process.env.HOME || "",
  ".cursor/projects/Users-macbook-Documents-Projects-Website/assets/image-64c39d68-6120-482b-95f4-243fa05381e8.png",
);

const MODEL = "gemini-3.1-flash-image";

const SHARED = `
You are given THREE images:
1) SCENE — the FynkTech platform marketing composition to recreate.
2) LOGO (high-res) — the official FynkTech circular logo (dark navy disc + stylized white "F").
3) LOGO MARK — same official mark for identity confirmation.

TASK: Recreate the SCENE at ultra-high fidelity (4K Ultra HD), but REPLACE every logo in the image with the OFFICIAL FynkTech logo from images 2/3.

COMPOSITION (match the scene):
- Soft light blue / lavender gradient background.
- Center: large white glassmorphic SaaS dashboard.
- Left navy sidebar: Dashboard (active), AI Agents, Automations, E-commerce, Analytics, Settings.
- Main: "Good morning," greeting, KPI cards (Total Revenue $24,780 +12.5%, Orders 1,248 +18.2%, Automation Saves 48h +32.4%), Sales Overview chart, Recent Activity.
- Four floating white feature cards with thin glowing neon connector lines (cyan/blue, green, purple):
  AI Agents (top-left), Workflow Automation (top-right), E-commerce (bottom-left), Analytics (bottom-right).

LOGO RULES (critical):
- Use ONLY the official FynkTech logo (navy circle + white stylized F from the attached logo images).
- Place it: (a) in the dashboard sidebar / brand area, (b) as the floating circular logo card bottom-left (same position as the scene).
- Do NOT invent a different F, monogram, shield, or generic lettermark.
- Do NOT use a flat blue square F or any non-official mark.
- The logo must clearly match the attached official logo.

QUALITY:
- Crisp readable UI text, sharp edges, premium agency product shot.
- No watermarks. Match scene layout closely; improve resolution and use the correct logo.
`;

const JOBS = [
  {
    name: "fynktech-platform-desktop.jpg",
    aspectRatio: "16:9",
    imageSize: "4K",
    prompt: `${SHARED}\nASPECT: Wide 16:9 landscape, full-bleed, for desktop website showcase.`,
  },
  {
    name: "fynktech-platform-mobile.jpg",
    aspectRatio: "3:4",
    imageSize: "2K",
    prompt: `${SHARED}\nASPECT: Tall 3:4 portrait for mobile screens; keep dashboard + four floating cards + official logo.`,
  },
];

function partFromFile(buf, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType =
    ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  return {
    inlineData: {
      mimeType,
      data: buf.toString("base64"),
    },
  };
}

async function generateOne({ name, aspectRatio, imageSize, prompt }, sceneBuf, logoBuf, markBuf) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY.trim(),
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: "Image 1 — SCENE composition to recreate:" },
            partFromFile(sceneBuf, SCENE_REF),
            { text: "Image 2 — OFFICIAL FynkTech logo (high-res). Use this exact logo:" },
            partFromFile(logoBuf, LOGO_REF),
            { text: "Image 3 — OFFICIAL FynkTech logo mark confirmation:" },
            partFromFile(markBuf, LOGO_MARK_REF),
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio,
          imageSize,
        },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gemini ${res.status} (${name}): ${JSON.stringify(data).slice(0, 800)}`);
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      const buffer = Buffer.from(inline.data, "base64");
      const out = path.join(OUT_DIR, name);
      await writeFile(out, buffer);
      console.log(`Wrote ${out} (${buffer.length} bytes)`);
      return;
    }
  }
  throw new Error(`No image in response for ${name}: ${JSON.stringify(data).slice(0, 500)}`);
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  await mkdir(OUT_DIR, { recursive: true });
  const [sceneBuf, logoBuf, markBuf] = await Promise.all([
    readFile(SCENE_REF),
    readFile(LOGO_REF),
    readFile(LOGO_MARK_REF),
  ]);
  console.log(
    `Scene ${sceneBuf.length}b | Logo ${logoBuf.length}b | Mark ${markBuf.length}b`,
  );

  for (const job of JOBS) {
    await generateOne(job, sceneBuf, logoBuf, markBuf);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
