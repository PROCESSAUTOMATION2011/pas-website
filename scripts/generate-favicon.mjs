import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcPng = path.join(root, 'src', 'assets', 'pas-logo.png');
const squarePng = path.join(root, 'public', 'favicon-square.png');
const outIco = path.join(root, 'public', 'favicon.ico');

async function main() {
  // Resize PAS logo to 256x256 square (fit inside, transparent background)
  await sharp(srcPng)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(squarePng);

  const buf = await pngToIco(squarePng);
  fs.writeFileSync(outIco, buf);

  fs.unlinkSync(squarePng);
  console.log('favicon.ico generated at public/favicon.ico');
}

main().catch((err) => {
  console.error('Error generating favicon:', err);
  process.exit(1);
});
