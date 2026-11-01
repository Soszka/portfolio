const fs = require('node:fs/promises');
const sharp = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const manifest = require('./images.json');
(async () => {
  await fs.mkdir('src/assets/HomePhotos/journey-v9', { recursive: true });
  for (const asset of manifest.assets) {
    const info = await sharp(asset.source).resize({ width: 1024, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6 }).toFile(asset.destination);
    console.log(asset.key, JSON.stringify(info));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
