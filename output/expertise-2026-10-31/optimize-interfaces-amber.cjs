const fs = require('node:fs/promises');
const sharp = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async () => {
  await fs.mkdir('src/assets/HomePhotos/expertise-v4', { recursive: true });
  const info = await sharp("C:\\Users\\bsoch\\.codex\\generated_images\\01a1892d-e7bc-7da3-91a9-830121d8cac4\\exec-ad4b28cd-1572-43da-a624-a6f8c3e0af95.png").resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile("src/assets/HomePhotos/expertise-v4/interfaces.webp");
  console.log(JSON.stringify(info));
})().catch(error => { console.error(error); process.exitCode = 1; });

