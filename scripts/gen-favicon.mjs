/**
 * Generate favicons (48/96/192/512), apple-touch-icon (180), and OG image (1200x630)
 * from public/fynktech-logo.jpg for Google site name / PWA / social previews.
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");
const source = resolve(publicDir, "fynktech-logo.jpg");

async function roundPng(size, outName, radiusRatio = 0.22) {
  const radius = Math.round(size * radiusRatio);
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/>
     </svg>`,
  );
  const out = resolve(publicDir, outName);
  await sharp(source)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(out);
  console.log("Generated", outName);
}

async function ogImage() {
  const width = 1200;
  const height = 630;
  const logoSize = 220;
  const logo = await sharp(source)
    .resize(logoSize, logoSize, { fit: "cover" })
    .png()
    .toBuffer();

  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#070643"/>
          <stop offset="100%" stop-color="#0f1a7a"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="120" y="280" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#ffffff">FynkTech</text>
      <text x="120" y="360" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#c9d2ff">AI Agents &amp; E-commerce Stores</text>
      <text x="120" y="420" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#9aa8e8">Gulf · UK · US</text>
    </svg>
  `);

  await sharp(svg)
    .composite([{ input: logo, top: 205, left: 860 }])
    .png()
    .toFile(resolve(publicDir, "og.png"));
  console.log("Generated og.png");
}

async function faviconIco() {
  // Multi-size ICO via PNG pack: write 48px as favicon.ico stand-in (PNG renamed is OK for modern browsers;
  // also keep icon-48.png as Google-preferred).
  await sharp(source)
    .resize(48, 48, { fit: "cover" })
    .png()
    .toFile(resolve(publicDir, "favicon.ico"));
  console.log("Generated favicon.ico (48px PNG)");
}

async function webManifestStatic() {
  // App Router also serves manifest.ts; keep a static fallback for crawlers that hit /site.webmanifest
  const manifest = {
    name: "FynkTech",
    short_name: "FynkTech",
    description: "AI agents and e-commerce stores for businesses in the Gulf, UK and US.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#070643",
    icons: [
      { src: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
  writeFileSync(resolve(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));
  console.log("Generated site.webmanifest");
}

async function run() {
  await roundPng(32, "favicon-32.png", 0.5);
  await roundPng(48, "icon-48.png");
  await roundPng(96, "icon-96.png");
  await roundPng(180, "apple-touch-icon.png");
  await roundPng(192, "icon-192.png");
  await roundPng(512, "icon-512.png");
  await faviconIco();
  await ogImage();
  await webManifestStatic();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
