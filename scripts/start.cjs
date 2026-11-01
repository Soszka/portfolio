const net = require('node:net');
const path = require('node:path');
const { realpathSync } = require('node:fs');
const { createRequire } = require('node:module');

process.chdir(path.resolve(__dirname, '..'));
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

let startScript;
try {
  startScript = require.resolve('react-scripts/scripts/start');
  const reactPath = realpathSync(require.resolve('react'));
  for (const dependency of ['react-dom', 'react-i18next', 'react-redux', '@mui/material']) {
    const dependencyRequire = createRequire(require.resolve(dependency));
    if (realpathSync(dependencyRequire.resolve('react')) !== reactPath) {
      throw new Error('MULTIPLE_REACT');
    }
  }
} catch (error) {
  console.error(error.message === 'MULTIPLE_REACT'
    ? 'Wykryto kilka kopii Reacta. Zatrzymaj serwer i odtwórz zależności poleceniem: npm ci'
    : 'Brak zależności projektu. W katalogu portfolio uruchom: npm ci');
  process.exit(1);
}
require('react-scripts/config/env');
process.env.HOST ||= '127.0.0.1';
process.env.PORT ||= '3000';

const host = process.env.HOST;
const port = Number(process.env.PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT musi być liczbą od 1 do 65535. Domyślny port aplikacji to 3000.');
  process.exit(1);
}
const address = ['0.0.0.0', '::'].includes(host) ? '127.0.0.1' : host;
const url = `${process.env.HTTPS === 'true' ? 'https' : 'http'}://${address.includes(':') ? `[${address}]` : address}:${port}`;
const probe = net.createServer();

probe.once('error', async error => {
  if (error.code === 'EADDRINUSE') {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (response.ok && /<title>Bartlomiej Socha<\/title>/i.test(await response.text())) {
        console.log(`Portfolio już działa: ${url}`);
        require('react-dev-utils/openBrowser')(url);
        return;
      }
    } catch {
      // An occupied port does not prove that a usable app is running.
    }
    console.error(`Port ${port} jest zajęty, ale portfolio nie odpowiada pod ${url}.`);
    console.error('Zatrzymaj poprzedni serwer albo ustaw inny PORT i uruchom npm start ponownie.');
  } else {
    console.error(`Nie można uruchomić serwera ${url}: ${error.message}`);
  }
  process.exitCode = 1;
});

probe.listen(port, host, () => probe.close(() => {
  console.log(`Portfolio: ${url}`);
  console.log('Zostaw terminal otwarty podczas korzystania z aplikacji.');
  require(startScript);
}));
