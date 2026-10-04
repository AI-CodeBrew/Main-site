/**
 * Generate blog cover (1200×675) + tile (600×720) images with Gemini,
 * upload to Bunny, patch Supabase.
 *
 * Ecommerce / Shopify → colorful Shopify-green lifestyle (not robotic 3D).
 * AI / Automation → dark but grounded, topic-relevant scenes (not glass orbs).
 *
 * Usage: node --env-file=.env.local scripts/generate-blog-images.mjs
 *        node --env-file=.env.local scripts/generate-blog-images.mjs --only=slug
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "blog");

const MODEL = "gemini-3.1-flash-image";
const COVER = { w: 1200, h: 675, aspect: "16:9", key: "cover" };
const TILE = { w: 600, h: 720, aspect: "4:5", key: "tile" };

const RULES = `
HARD RULES for every image:
- Full-bleed, edge-to-edge. No poster frames, no white card insets, no letterboxing.
- NO titles, headlines, watermarks, logos, or brand wordmarks on the canvas.
- Tiny UI labels inside a phone/laptop screen are OK if soft and secondary.
- Photoreal or lightly stylized editorial photography — NOT generic robotic AI 3D
  (avoid floating glass orbs, neon particle sprays, crystal nodes, chrome holograms).
- Natural materials, believable lighting, one clear subject, generous negative space.
`;

const SHOPIFY_STYLE = `
STYLE — Shopify / e-commerce (colorful):
- Warm, inviting, human retail photography.
- Shopify brand energy: fresh greens (#95BF47, #008060), soft mint, cream, white,
  light wood or clean desk — cheerful, not dark cyberpunk.
- Feels like a real store / packaging / phone checkout moment.
${RULES}
`;

const AI_STYLE = `
STYLE — AI / automation (grounded, relevant):
- Keep a sophisticated dark or deep-navy atmosphere with soft teal/blue accents —
  similar mood to a premium AI product shot, but grounded in REAL objects.
- Show something clearly related to the article topic (headset, chat, laptop tools,
  connected desk apps) — not abstract glowing geometry.
- Soft cinematic light, shallow depth of field, human-scale scene.
${RULES}
`;

const BLOGS = [
  {
    slug: "cash-on-delivery-for-shopify-in-pakistan-how-to-cut-fake-orders-refusals-and-returns-in-2026",
    family: "shopify",
    subject: `Cash-on-delivery order confirmation for Shopify Pakistan.
Scene: a real smartphone in a person's hand (or resting on a cream desk) showing a
WhatsApp-style order confirmation with a green check, next to a small cardboard parcel
with packing tape. Soft daylight, Shopify green accents in packaging ribbon or UI.
Warm, trustworthy, colorful — about confirming COD orders and cutting fake orders.`,
  },
  {
    slug: "dropshipping-in-pakistan-the-complete-2026-guide-to-starting-selling-and-scaling",
    family: "shopify",
    subject: `Dropshipping in Pakistan — starting and scaling.
Scene: neat stack of small product parcels / poly mailers ready to ship on a bright
desk, smartphone with a simple storefront product page, soft mint and Shopify-green
accents, cream background. Energetic, colorful, practical e-commerce vibe.`,
  },
  {
    slug: "shopify-dropshipping-in-pakistan-15-successful-shopify-stores-to-learn-from-in-2026",
    family: "shopify",
    subject: `Successful Shopify dropshipping stores to learn from.
Scene: open laptop showing a colorful clean product-grid online store (soft UI,
no giant text), small plant and coffee on a bright desk, Shopify green accent
notebook or sticky note. Aspirational store-owner workspace, colorful and friendly.`,
  },
  {
    slug: "shopify-in-pakistan-the-complete-2026-guide-to-launching-ranking-and-scaling-your-online-store",
    family: "shopify",
    subject: `Launching a Shopify store in Pakistan.
Scene: laptop and phone side by side on a sunlit desk launching an online store —
laptop shows a bright product landing page, phone shows mobile storefront. Soft
greens, white, warm wood. Fresh Shopify launch energy, colorful and real.`,
  },
  {
    slug: "shopify-stores-built-to-convert",
    family: "shopify",
    subject: `Shopify stores built to convert — clear funnels and checkout.
Scene: smartphone showing a clean mobile checkout / "Buy now" moment with Shopify
green primary button, credit card and small shopping bag nearby on a light marble
or cream surface. Bright, conversion-focused, colorful retail photography.`,
  },
  {
    slug: "ai-agents-that-qualify-leads-24-7",
    family: "ai",
    subject: `AI voice and chat agents that qualify leads 24/7 then hand off to humans.
Scene: premium headset on a desk next to a laptop showing a soft CRM / chat inbox
with a few conversation bubbles (blurred, not readable paragraphs). Night desk with
warm lamp + cool teal screen glow. Feels like a real sales ops setup, not abstract AI art.
Relevant to lead qualification and human handoff.`,
  },
  {
    slug: "the-20-best-ai-tools-in-2026-free-paid-that-actually-grow-your-business",
    family: "ai",
    subject: `Best AI tools for business growth — writing, research, design, coding, automation.
Scene: creator/founder's desk — open laptop with a soft multi-panel AI workspace
(doc draft + image thumbnail + code pane, all blurred/abstract UI), notebook and pen,
cool teal rim light. Practical "toolkit" feeling, relevant to AI tools list — not orbs.`,
  },
  {
    slug: "workflow-automation-that-cuts-busywork",
    family: "ai",
    subject: `Workflow automation connecting CRM, support, and ops tools.
Scene: laptop showing a simple automation canvas (a few connected nodes labeled softly
like Lead → CRM → Slack), phone with a notification checkmark, tidy desk. Dark navy
mood with teal accents. Clear "busywork automated" story — grounded, not crystal geometry.`,
  },
];

function requireEnv(name) {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function parseArgs(argv) {
  const only = argv.find((a) => a.startsWith("--only="))?.slice(7);
  return {
    only: only ? only.split(",").map((s) => s.trim()).filter(Boolean) : null,
  };
}

async function generateImage(apiKey, prompt, aspect) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: aspect,
          imageSize: "2K",
        },
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${JSON.stringify(data).slice(0, 500)}`);
  for (const part of data?.candidates?.[0]?.content?.parts || []) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) return Buffer.from(inline.data, "base64");
  }
  throw new Error(`No image: ${JSON.stringify(data).slice(0, 400)}`);
}

async function toExactJpeg(buffer, w, h) {
  return sharp(buffer)
    .rotate()
    .resize(w, h, { fit: "cover", position: "centre" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

async function uploadToBunny(buffer, filename) {
  const zone = requireEnv("BUNNY_STORAGE_ZONE");
  const apiKey = requireEnv("BUNNY_STORAGE_API_KEY");
  const host = (process.env.BUNNY_STORAGE_HOST || "sg.storage.bunnycdn.com").replace(
    /^https?:\/\//,
    "",
  );
  const cdn = requireEnv("BUNNY_CDN_URL").replace(/\/$/, "");
  const prefix = (process.env.BUNNY_UPLOAD_PREFIX || "uploads").replace(/^\/|\/$/g, "");
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const objectPath = `${prefix}/blog/${stamp}-${filename}`;
  const endpoint = `https://${host}/${zone}/${objectPath}`;

  const res = await fetch(endpoint, {
    method: "PUT",
    headers: {
      AccessKey: apiKey,
      "Content-Type": "image/jpeg",
    },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Bunny ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return `${cdn}/${objectPath}`;
}

async function patchBlog(slug, image, card_image) {
  const url = requireEnv("SUPABASE_URL").replace(/\/$/, "");
  const key = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const res = await fetch(`${url}/rest/v1/blogs?slug=eq.${encodeURIComponent(slug)}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      image,
      card_image,
      updated_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

async function main() {
  const { only } = parseArgs(process.argv.slice(2));
  const apiKey = requireEnv("GEMINI_API_KEY");
  await mkdir(OUT_DIR, { recursive: true });

  const list = BLOGS.filter((b) => !only || only.includes(b.slug));
  const results = [];

  for (const blog of list) {
    const style = blog.family === "shopify" ? SHOPIFY_STYLE : AI_STYLE;
    const out = { slug: blog.slug, family: blog.family };

    for (const variant of [COVER, TILE]) {
      process.stdout.write(`${blog.slug.slice(0, 40)} · ${variant.key}… `);
      const prompt = `${style}

ARTICLE CONTEXT / SUBJECT:
${blog.subject}

Output: ${variant.aspect} ${variant.key === "cover" ? "widescreen story cover" : "portrait homepage tile"}.
Make it look like a real photo shoot for a modern SaaS marketing site — warm and human for Shopify, cinematic but real for AI.`;

      const raw = await generateImage(apiKey, prompt, variant.aspect);
      const jpeg = await toExactJpeg(raw, variant.w, variant.h);
      const meta = await sharp(jpeg).metadata();
      if (meta.width !== variant.w || meta.height !== variant.h) {
        throw new Error(`Bad size ${meta.width}x${meta.height}`);
      }
      const filename = `${blog.slug.slice(0, 48)}-${variant.key}-${variant.w}x${variant.h}.jpg`;
      await writeFile(path.join(OUT_DIR, filename), jpeg);
      out[variant.key] = await uploadToBunny(jpeg, filename);
      console.log(`${meta.width}×${meta.height} ok`);
    }

    await patchBlog(blog.slug, out.cover, out.tile);
    console.log(`  → DB updated\n`);
    results.push(out);
  }

  await writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
