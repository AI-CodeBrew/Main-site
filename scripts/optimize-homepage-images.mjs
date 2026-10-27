/**
 * Convert homepage images to WebP (+ mobile sizes).
 * Usage: node scripts/optimize-homepage-images.mjs
 *
 * Expects source files when regenerating from originals.
 * Skips missing inputs so a clean public/ tree still works.
 */
import { access } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function writeWebp(input, output, { width, quality = 78 }) {
  if (!(await exists(input))) {
    console.log(`skip (missing source) ${path.relative(ROOT, input)}`);
    return;
  }
  await mkdir(path.dirname(output), { recursive: true });
  const info = await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output);
  const kb = (info.size / 1024).toFixed(1);
  console.log(`✓ ${path.relative(ROOT, output)} (${kb} KB, ${info.width}×${info.height})`);
}

async function main() {
  const platform = [
    "project-dialcom.jpg",
    "project-fynktech-v5.jpg",
    "project-arabia-sales-bot.jpg",
  ];
  for (const file of platform) {
    const input = path.join(ROOT, "public/platform", file);
    const base = file.replace(/\.jpe?g$/i, "");
    await writeWebp(input, path.join(ROOT, "public/platform", `${base}.webp`), {
      width: 1440,
      quality: 78,
    });
    await writeWebp(input, path.join(ROOT, "public/platform", `${base}-mobile.webp`), {
      width: 768,
      quality: 72,
    });
  }

  const projects = ["dialcom.jpg", "arabia-ai.jpg", "the-local-baba.jpg"];
  for (const file of projects) {
    const input = path.join(ROOT, "public/projects", file);
    const base = file.replace(/\.jpe?g$/i, "");
    await writeWebp(input, path.join(ROOT, "public/projects", `${base}.webp`), {
      width: 640,
      quality: 78,
    });
    await writeWebp(input, path.join(ROOT, "public/projects", `${base}-mobile.webp`), {
      width: 400,
      quality: 72,
    });
  }

  const logos = [
    "dialcom.png",
    "arabia-sales-bot.png",
    "lumenook.png",
    "localbaba.png",
    "everlooms.png",
    "useandkeep.png",
    "maisonnor.png",
    "playback.png",
    "one-stations-logo.png",
  ];
  for (const file of logos) {
    const input = path.join(ROOT, "public/companylogos", file);
    const base = file.replace(/\.(png|jpe?g)$/i, "");
    await writeWebp(input, path.join(ROOT, "public/companylogos", `${base}.webp`), {
      width: 240,
      quality: 82,
    });
  }

  const brandSrc = path.join(ROOT, "public", "fynktech-logo.jpg");
  await writeWebp(brandSrc, path.join(ROOT, "public", "fynktech-mark.webp"), {
    width: 128,
    quality: 85,
  });
  await writeWebp(brandSrc, path.join(ROOT, "public", "fynktech-mark-mobile.webp"), {
    width: 64,
    quality: 82,
  });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
