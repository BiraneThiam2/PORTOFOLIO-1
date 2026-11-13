// Rendu image par image de motion.html via DevTools. Usage :
//   node render.mjs stills 1.2 5 13.3 ...   → captures de contrôle (stills/)
//   node render.mjs video                   → toutes les images (frames/)
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
const DIR = new URL('./', import.meta.url).pathname;
const BIN = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-x64/chrome-headless-shell';
const FPS = 30;
const [mode, ...times] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const proc = spawn(BIN, ['--remote-debugging-port=9335', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
await sleep(1500);
const list = await (await fetch('http://127.0.0.1:9335/json')).json();
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = {};
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; } };
const send = (method, params = {}) => new Promise((r) => { pend[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;
await send('Emulation.setDeviceMetricsOverride', { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
await send('Page.enable');
await send('Page.navigate', { url: 'file://' + DIR + 'motion.html' });
await sleep(1500);
await ev('window.ready');
await sleep(500);
const shot = async (t, file, fmt = 'jpeg') => {
  await ev(`seek(${t}); new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
  const s = await send('Page.captureScreenshot', { format: fmt, quality: 94 });
  writeFileSync(file, Buffer.from(s.data, 'base64'));
};
if (mode === 'stills') {
  mkdirSync(DIR + 'stills', { recursive: true });
  for (const t of times) await shot(+t, `${DIR}stills/t${t}.jpg`);
} else {
  mkdirSync(DIR + 'frames', { recursive: true });
  const total = Math.round((await ev('window.DURATION')) * FPS);
  for (let i = 0; i < total; i++) {
    await shot(i / FPS, `${DIR}frames/${String(i).padStart(5, '0')}.jpg`);
    if (i % 90 === 0) console.log(`${i}/${total}`);
  }
}
ws.close(); proc.kill(); process.exit(0);
