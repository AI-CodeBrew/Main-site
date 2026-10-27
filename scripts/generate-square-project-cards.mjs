/**
 * Square colored-canvas project cards (phone / monitor / laptop).
 * Usage: node --env-file=.env.local scripts/generate-square-project-cards.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "projects");
const ASSETS = path.join(
  ROOT,
  "..",
  "..",
  ".cursor/projects/Users-macbook-Documents-Projects-Website/assets",
);
// Prefer absolute assets path from this machine
const REF_PHONE = "/Users/macbook/.cursor/projects/Users-macbook-Documents-Projects-Website/assets/image-e05bfdc3-514c-48d9-a935-5faf2efa5ffc.png";
const REF_MONITOR = "/Users/macbook/.cursor/projects/Users-macbook-Documents-Projects-Website/assets/image-7a1ebbc2-a2bb-470b-bbaa-304593658138.png";

const MODEL = "gemini-3.1-flash-image";
const ASPECT = "1:1";
const IMAGE_SIZE = "2K";

const JOBS = [
  {
    slug: "dialcom",
    out: "dialcom.jpg",
    color: "vivid warm YELLOW / gold (#F5C518 → #E8B400), soft vignette darker at edges",
    device: "single modern smartphone centered in the square — same framing as STYLE REF A (phone only, generous colored margin around it)",
    product: `Dialcom — AI voice CRM for lenders.
Phone screen: light Dialcom mobile UI — wordmark "Dialcom", upcoming calls, leads, booking CTAs, teal accents.
NO fake logo icon — text wordmark only.`,
  },
  {
    slug: "arabia-ai",
    out: "arabia-ai.jpg",
    color: "rich BLUE gradient (#3B82F6 → #1D4ED8), soft vignette darker at edges",
    device: "single thin-bezel desktop monitor on a silver stand, perfectly centered — same framing as STYLE REF B (monitor only, generous colored margin)",
    product: `Arabia AI / Arabia Sales Bot — WhatsApp commerce AI.
Monitor screen: light Arabia AI dashboard — chat inbox, order panel, confirmed orders, soft orange accents, "Arabia AI" branding.`,
  },
  {
    slug: "the-local-baba",
    out: "the-local-baba.jpg",
    color: "lush GREEN gradient (#22C55E → #15803D), soft vignette darker at edges",
    device: "single modern MacBook / laptop centered in the square at a slight 3/4 angle — DIFFERENT composition from the phone and monitor refs (laptop only, generous colored margin, no phone beside it)",
    product: `The Local Baba — B2B wholesale marketplace.
Laptop screen: light product-grid storefront / marketplace UI with warm orange accents, clean cards, search.`,
  },
];

async function loadPng(filePath) {
  const buf = await readFile(filePath);
  return { mimeType: "image/png", data: buf.toString("base64") };
}

async function generate(job, phoneRef, monitorRef) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const parts = [
    { text: "STYLE REF A — phone centered in a dark SQUARE color block (match this framing exactly):" },
    { inlineData: phoneRef },
    { text: "STYLE REF B — desktop monitor centered in a green SQUARE color block (match this framing exactly):" },
    { inlineData: monitorRef },
    {
      text: `
Create ONE premium portfolio card image.

CANVAS (critical):
- Perfect SQUARE 1:1 composition, full-bleed.
- Background is a solid / soft-gradient colored square: ${job.color}.
- Soft studio lighting, subtle depth, NO desk, NO keyboard, NO plant, NO tech-stack bar, NO floating pills, NO watermark, NO large background typography behind the device.
- Device floats centered with equal padding on all sides (roughly 12–18% margin).

DEVICE:
- ${job.device}
- Photoreal device chrome, sharp UI on screen, high-end agency quality.

PRODUCT UI:
${job.product}

Do NOT copy Aventura Dental or Creative Energy content — only copy the SQUARE + centered-device layout language from the refs.
`,
    },
  ];

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
        imageConfig: { aspectRatio: ASPECT, imageSize: IMAGE_SIZE },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${job.slug}: ${res.status} ${JSON.stringify(data).slice(0, 700)}`);
  }
  for (const part of data?.candidates?.[0]?.content?.parts || []) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      const buf = Buffer.from(inline.data, "base64");
      const outPath = path.join(OUT, job.out);
      await writeFile(outPath, buf);
      console.log(`Wrote ${outPath} (${buf.length} bytes)`);
      return buf.length;
    }
  }
  throw new Error(`No image for ${job.slug}: ${JSON.stringify(data).slice(0, 400)}`);
}

async function main() {
  if (!process.env.GEMINI_API_KEY?.trim()) throw new Error("Missing GEMINI_API_KEY");
  await mkdir(OUT, { recursive: true });
  const [phoneRef, monitorRef] = await Promise.all([
    loadPng(REF_PHONE),
    loadPng(REF_MONITOR),
  ]);
  console.log("Loaded style refs");
  for (const job of JOBS) {
    process.stdout.write(`Generating ${job.slug}… `);
    await generate(job, phoneRef, monitorRef);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
