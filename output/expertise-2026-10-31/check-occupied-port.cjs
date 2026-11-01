const assert = require('node:assert/strict');
const http = require('node:http');
const { spawn } = require('node:child_process');
const path = require('node:path');

const server = http.createServer((req, res) => res.end('<title>Another application</title>'));
server.listen(0, '127.0.0.1', async () => {
  let output = '';
  const child = spawn(process.execPath, [path.resolve('scripts/start.cjs')], {
    env: { ...process.env, BROWSER: 'none', HOST: '127.0.0.1', PORT: String(server.address().port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', chunk => { output += chunk; });
  child.stderr.on('data', chunk => { output += chunk; });
  child.once('exit', code => {
    server.close();
    try {
      assert.equal(code, 1, output);
      assert.match(output, /jest zajęty, ale portfolio nie odpowiada/);
      console.log('PASS: an unrelated occupied port reports a clear error and exits with code 1.');
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
});
