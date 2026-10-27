/**
 * Generate minimal portfolio cards with Gemini 3.1 Flash Image.
 * Uses the previous Dialcom / Arabia AI / Local Baba mockups as style references:
 * desktop + phone screenshots + bottom tech-stack bar, NO project title on the image.
 *
 * Usage: node --env-file=.env.local scripts/generate-project-images.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "projects");
const REF_DIR = path.join(OUT_DIR, "refs");

const MODEL = "gemini-3.1-flash-image";
const ASPECT = "2:3";
const IMAGE_SIZE = "2K";

const REFS = {
  dialcom: "1790768883399-b0rlqy-chatgpt-image-sep-30-2026-04_47_08-pm.png",
  arabia: "1790849684374-9lf2rw-c4c5dde2-d06c-432c-b15e-f7df1e4e133d.png",
  localBaba: "1790850527471-bw6hjx-iiiiii.png",
};

const SHARED_RULES = `
STYLE (keep device composition from attached references, but FORCE LIGHT THEME):
- Tall vertical 2:3 portfolio mockup card.
- Clean, simple, MINIMAL composition — less marketing copy than the references.
- Show BOTH a realistic desktop/laptop web UI screenshot AND a smartphone mobile UI screenshot.
- LIGHT studio background: soft off-white / light grey / cream desk, gentle daylight, subtle soft shadows — NOT a dark/black/navy studio.
- CRITICAL: All app UIs on the screens must be LIGHT THEME — white/light-grey canvases, dark text, soft borders, airy SaaS dashboards. Do NOT use dark-mode UI chrome, black sidebars as the main look, or neon-on-black interfaces.
- Accent color sparingly (cyan #01B4D2 or soft blue) on buttons/chips only.
- Bottom of the frame: a clear horizontal TECH STACK bar (light pill / soft grey strip) with real tech logos + short labels.
- Keyboard / mouse / tiny plant optional; keep them quiet.

HARD RULES:
- Do NOT write the project name / title as a big headline on the canvas (the site already shows the title).
- ZERO captions / taglines / subtitles / labels outside the device screens and the stack bar.
- Absolutely NO watermark text like "Clean SaaS Platform Mockup", "Mockup", "Portfolio", or any overlay title at the top of the image.
- Small logos inside the UI screenshots are OK.
- No giant marketing headlines, no long paragraphs, no CTA buttons as large overlays on the canvas.
- No watermarks. High-end, sharp, agency portfolio quality.
- If a reference is dark-themed, convert the mood to light while keeping layout/device placement.
`;

const PROJECTS = [
  {
    slug: "dialcom",
    title: "Dialcom",
    refs: ["dialcom"],
    stack: "Next.js, Supabase, Vapi, Twilio, Google Calendar, Zoom, Google Meet, Google Sheets",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: Dialcom — AI voice receptionist / CRM for lenders that qualifies, calls, and books appointments.
Compose a FRESH premium shot (not a copy of the reference): slightly new camera angle, cleaner desk, sharper UI.
UI content: LIGHT-THEME iMac/desktop CRM dashboard with call KPIs, booking rate chart, call outcomes, timezone clocks + iPhone showing a crisp Dialcom mobile dashboard (upcoming calls, leads, booking).
Stack bar labels exactly: Next.js · Supabase · Vapi · Twilio · Calendar · Zoom · Meet · Sheets
Use the attached Dialcom reference only for device + stack-bar language — make the final image look newer and more polished.`,
  },
  {
    slug: "arabia-ai",
    title: "Arabia AI",
    refs: ["arabia", "dialcom"],
    stack: "Next.js, Supabase, Meta WhatsApp, Fly.io, Redis, Shopify",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: Arabia AI / Arabia Sales Bot — WhatsApp commerce AI that turns chats into confirmed Shopify orders.
Compose a FRESH premium shot: MacBook + iPhone on a warm cream desk, soft daylight, tiny plant optional.
UI content: LIGHT-THEME laptop inbox/dashboard (chat list, order panel, confirmed/paid statuses, soft terracotta/teal accents) + phone showing a WhatsApp-style chat with an AI order confirmation / payment link card.
NO skyline collage. NO top-of-image title text. NO "Clean SaaS" or mockup watermark.
Stack bar: Next.js · Supabase · Meta · Fly.io · Redis · Shopify
Use attached refs for device placement language only — output a cleaner Dialcom-quality device mockup.`,
  },
  {
    slug: "the-local-baba",
    title: "The Local Baba",
    refs: ["localBaba", "dialcom"],
    stack: "Next.js, Node.js, Supabase, Meta, Redis, Fly.io, Vercel",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: The Local Baba — B2B wholesale marketplace / e-commerce.
UI content: LIGHT-THEME laptop product grid storefront + phone product / browse screen.
Warm orange accent lighting OK. No large "Modern E-commerce" headlines, no feature icon columns, no CTA button overlays.
Stack bar: Next.js · Node.js · Supabase · Meta · Redis · Fly.io · Vercel
Use attached Local Baba + Dialcom references — keep devices + stack, drop marketing copy blocks.`,
  },
  {
    slug: "workflow-system",
    title: "Workflow system",
    refs: ["dialcom"],
    stack: "n8n, Make, Node.js, Supabase, Redis",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: Business workflow automation system.
UI content: LIGHT-THEME desktop automation canvas / workflow builder with connected nodes + phone showing run status / approvals.
Stack bar: n8n · Make · Node.js · Supabase · Redis
Compose like the Dialcom reference (monitor + phone + stack bar), simpler and cleaner.`,
  },
  {
    slug: "sales-funnel",
    title: "Sales funnel",
    refs: ["dialcom", "localBaba"],
    stack: "Shopify, Meta Ads, GA4, Klaviyo, Next.js",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: E-commerce sales funnel / conversion growth.
UI content: LIGHT-THEME desktop funnel analytics / landing builder dashboard + phone checkout or light landing page.
Stack bar: Shopify · Meta Ads · GA4 · Klaviyo · Next.js
Compose like the Dialcom reference — devices + stack only, no big marketing text.`,
  },
  {
    slug: "custom-agent",
    title: "Custom agent",
    refs: ["dialcom", "arabia"],
    stack: "LangChain, OpenAI, Vapi, Supabase, Next.js",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: Custom AI agent product (chat + voice).
UI content: LIGHT-THEME desktop agent console / conversation analytics + phone chat agent UI.
Stack bar: LangChain · OpenAI · Vapi · Supabase · Next.js
Compose like the Dialcom reference — devices + stack only.`,
  },
  // Keep store-launch + support-agent files in sync with DEFAULT_PROJECTS fallbacks
  {
    slug: "store-launch",
    title: "Store launch",
    refs: ["localBaba", "dialcom"],
    stack: "Shopify, Stripe, Klaviyo, Next.js",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: Premium Shopify store launch.
UI content: LIGHT-THEME desktop Shopify storefront / admin + phone product page.
Stack bar: Shopify · Stripe · Klaviyo · Next.js
Compose like Dialcom/Local Baba references — devices + stack, no headlines.`,
  },
  {
    slug: "support-agent",
    title: "Support agent",
    refs: ["dialcom", "arabia"],
    stack: "Vapi, Twilio, LangChain, Supabase, Next.js",
    prompt: `${SHARED_RULES}
PROJECT CONTEXT: AI voice & chat support agent.
UI content: LIGHT-THEME desktop support inbox / ticket dashboard + phone chat / call UI.
Stack bar: Vapi · Twilio · LangChain · Supabase · Next.js
Compose like Dialcom reference — devices + stack, no headlines.`,
  },
];

function requireEnv(name) {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function bunnyConfigured() {
  return Boolean(
    process.env.BUNNY_STORAGE_ZONE &&
      process.env.BUNNY_STORAGE_API_KEY &&
      process.env.BUNNY_CDN_URL,
  );
}

async function loadRef(filename) {
  const buf = await readFile(path.join(REF_DIR, filename));
  const ext = path.extname(filename).toLowerCase();
  const mime =
    ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".webp"
        ? "image/webp"
        : "image/png";
  return { mime, data: buf.toString("base64") };
}

async function generateImage(apiKey, prompt, refParts) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const parts = [
    ...refParts.map((r) => ({
      inlineData: { mimeType: r.mime, data: r.data },
    })),
    { text: prompt },
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts }],
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
    throw new Error(`Gemini ${res.status}: ${JSON.stringify(data).slice(0, 500)}`);
  }

  const outParts = data?.candidates?.[0]?.content?.parts || [];
  for (const part of outParts) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      return {
        buffer: Buffer.from(inline.data, "base64"),
        mime: inline.mimeType || inline.mime_type || "image/png",
      };
    }
  }
  throw new Error(`No image in response: ${JSON.stringify(data).slice(0, 400)}`);
}

async function uploadToBunny(buffer, filename, contentType) {
  const zone = requireEnv("BUNNY_STORAGE_ZONE");
  const apiKey = requireEnv("BUNNY_STORAGE_API_KEY");
  const host = (process.env.BUNNY_STORAGE_HOST || "sg.storage.bunnycdn.com").replace(
    /^https?:\/\//,
    "",
  );
  const cdn = requireEnv("BUNNY_CDN_URL").replace(/\/$/, "");
  const prefix = (process.env.BUNNY_UPLOAD_PREFIX || "uploads").replace(/^\/|\/$/g, "");
  const objectPath = `${prefix}/projects/${filename}`;
  const endpoint = `https://${host}/${zone}/${objectPath}`;

  const res = await fetch(endpoint, {
    method: "PUT",
    headers: {
      AccessKey: apiKey,
      "Content-Type": contentType,
    },
    body: buffer,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bunny upload ${res.status}: ${text.slice(0, 300)}`);
  }
  return `${cdn}/${objectPath}`;
}

function parseArgs(argv) {
  const only = argv.find((a) => a.startsWith("--only="))?.slice(7);
  return {
    only: only ? only.split(",").map((s) => s.trim()).filter(Boolean) : null,
  };
}

async function main() {
  const apiKey = requireEnv("GEMINI_API_KEY");
  const { only } = parseArgs(process.argv.slice(2));
  await mkdir(OUT_DIR, { recursive: true });

  const list = PROJECTS.filter((p) => !only || only.includes(p.slug));
  if (!list.length) throw new Error(`No projects matched --only=${only?.join(",")}`);

  const neededRefs = new Set(list.flatMap((p) => p.refs));
  const refCache = {};
  for (const [key, file] of Object.entries(REFS)) {
    if (!neededRefs.has(key)) continue;
    refCache[key] = await loadRef(file);
    console.log(`Loaded ref ${key} (${file})`);
  }

  const mapPath = path.join(OUT_DIR, "manifest.json");
  let existing = [];
  try {
    existing = JSON.parse(await readFile(mapPath, "utf8"));
  } catch {
    existing = [];
  }

  const results = [...existing];
  for (const project of list) {
    process.stdout.write(`Generating ${project.slug}… `);
    const refParts = project.refs.map((k) => refCache[k]);
    const { buffer, mime } = await generateImage(apiKey, project.prompt, refParts);
    const outName = `${project.slug}.jpg`;
    const contentType = mime.includes("png")
      ? "image/png"
      : mime.includes("webp")
        ? "image/webp"
        : "image/jpeg";
    await writeFile(path.join(OUT_DIR, outName), buffer);

    let cdnUrl = `/projects/${outName}`;
    if (bunnyConfigured()) {
      cdnUrl = await uploadToBunny(buffer, outName, contentType);
      process.stdout.write(`CDN ok → ${cdnUrl}\n`);
    } else {
      process.stdout.write(`local only → ${cdnUrl}\n`);
    }

    const entry = {
      slug: project.slug,
      title: project.title,
      stack: project.stack,
      local: `/projects/${outName}`,
      url: cdnUrl,
      bytes: buffer.length,
    };
    const idx = results.findIndex((r) => r.slug === project.slug);
    if (idx >= 0) results[idx] = entry;
    else results.push(entry);
  }

  await writeFile(mapPath, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${mapPath}`);
  console.log(JSON.stringify(results.filter((r) => list.some((p) => p.slug === r.slug)), null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
