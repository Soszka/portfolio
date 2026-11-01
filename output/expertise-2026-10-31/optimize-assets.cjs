const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const assets = [
  {
    "key": "interfaces",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-67219bcc-de37-498e-a81c-9b462aa04601.png",
    "destination": "src/assets/HomePhotos/expertise-v3/interfaces.webp"
  },
  {
    "key": "frontend",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-e79b8089-7a89-4a30-992a-1c36e17a7c99.png",
    "destination": "src/assets/HomePhotos/expertise-v3/frontend.webp"
  },
  {
    "key": "backend",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-e9954f4b-739e-4b14-8e42-d249d7285ac7.png",
    "destination": "src/assets/HomePhotos/expertise-v3/backend.webp"
  },
  {
    "key": "testing",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-db6cf32b-0a14-43c1-b677-7fc30e80bf34.png",
    "destination": "src/assets/HomePhotos/expertise-v3/testing.webp"
  },
  {
    "key": "delivery",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-5e8a6a05-ef75-45dd-a838-30054f84b7ee.png",
    "destination": "src/assets/HomePhotos/expertise-v3/delivery.webp"
  },
  {
    "key": "architecture",
    "source": "C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-55ad5743-c867-418c-9d62-dc5c6befede7.png",
    "destination": "src/assets/HomePhotos/expertise-v3/architecture.webp"
  }
];
(async () => {
  for (const asset of assets) {
    await fs.mkdir(path.dirname(asset.destination), { recursive: true });
    const info = await sharp(asset.source).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(asset.destination);
    console.log(JSON.stringify({ file: asset.destination, ...info }));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

