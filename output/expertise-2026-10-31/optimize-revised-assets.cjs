const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async () => {
  for (const asset of [
  {
    "key": "backend",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-57d7635b-c2ed-41b9-a099-04ee3c50b5c6.png",
    "destination": "src/assets/HomePhotos/expertise-v4/backend.webp"
  },
  {
    "key": "architecture",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-bb7e7931-5533-4eb4-91fe-a399448e15a1.png",
    "destination": "src/assets/HomePhotos/expertise-v4/architecture.webp"
  }
]) {
    await fs.mkdir(path.dirname(asset.destination), { recursive: true });
    const info = await sharp(asset.source).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(asset.destination);
    console.log(JSON.stringify({file: asset.destination, ...info}));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

