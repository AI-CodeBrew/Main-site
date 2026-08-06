import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = resolve(__dirname, '..', 'public');
const source = resolve(publicDir, 'fynktech-logo.jpg');
const target = resolve(publicDir, 'favicon-32.png');

const cornerRadius = 16; // pixels - fully circular on 32x32

const roundedMaskSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
     <rect x="0" y="0" width="32" height="32" rx="${cornerRadius}" ry="${cornerRadius}" fill="#fff"/>
   </svg>`
);

async function run() {
  await sharp(source)
    .resize(32, 32, { fit: 'cover' })
    .composite([{ input: roundedMaskSvg, blend: 'dest-in' }])
    .png({ quality: 90 })
    .toFile(target);
  console.log('Generated', target);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


