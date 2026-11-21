const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = { '.html':'text/html', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.css':'text/css', '.js':'text/javascript', '.mp4':'video/mp4', '.webm':'video/webm', '.webp':'image/webp', '.svg':'image/svg+xml' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8080, () => console.log('Serving http://localhost:8080'));
