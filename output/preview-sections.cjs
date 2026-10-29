const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../build');
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json', '.ico':'image/x-icon' };
http.createServer((req, res) => {
  let target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) target = path.join(root, 'index.html');
  res.setHeader('Content-Type', mime[path.extname(target)] || 'application/octet-stream');
  const stream = fs.createReadStream(target);
  stream.on('error', () => {
    if (!res.headersSent) res.writeHead(503);
    res.end('Preview rebuilding. Refresh shortly.');
  });
  stream.pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('Preview ready: http://127.0.0.1:4173'));

