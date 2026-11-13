// Capture des visuels du portfolio via le protocole DevTools.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const OUT = new URL('./assets/', import.meta.url).pathname;
const BIN = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-x64/chrome-headless-shell';
const BASE = 'http://localhost:4789/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const proc = spawn(BIN, ['--remote-debugging-port=9334', '--force-prefers-reduced-motion', 'about:blank'], { stdio: 'ignore' });
await sleep(1500);

async function page() {
  const t = await (await fetch('http://127.0.0.1:9334/json/new?about:blank', { method: 'PUT' })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pend = {};
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (pend[m.id]) {
      pend[m.id](m.result ?? m.error);
      delete pend[m.id];
    }
  };
  const send = (method, params = {}) =>
    new Promise((r) => {
      pend[++id] = r;
      ws.send(JSON.stringify({ id, method, params }));
    });
  return { send, close: () => ws.close() };
}

async function shoot({ name, w, h, dpr = 1, mobile = false, storage = {}, hash = '', before, clip = 'viewport', fmt = 'png' }) {
  const { send, close } = await page();
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile });
  await send('Page.enable');
  const js = Object.entries({ lang: 'fr', theme: 'dark', ...storage })
    .map(([k, v]) => `localStorage.setItem('${k}','${v}');`)
    .join('');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: js });
  await send('Page.navigate', { url: BASE + hash });
  await sleep(2500);
  const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.value;
  // déclenche les apparitions au défilement
  const H = await ev('document.documentElement.scrollHeight');
  if (clip !== 'viewport') {
    for (let y = 0; y < H; y += 400) {
      await ev(`window.scrollTo(0,${y})`);
      await sleep(60);
    }
    await ev('window.scrollTo(0,0)');
    await sleep(800);
  }
  if (before) {
    await ev(before);
    await sleep(900);
  }
  let params = { format: fmt, ...(fmt === 'jpeg' ? { quality: 90 } : {}) };
  if (clip === 'full') params = { ...params, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: Math.min(H, process.env.MAXH ? +process.env.MAXH : H), scale: 1 } };
  else if (clip?.maxH) params = { ...params, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: Math.min(H, clip.maxH), scale: 1 } };
  else if (clip?.selector) {
    const top = await ev(`document.querySelector('${clip.selector}').getBoundingClientRect().top + window.scrollY`);
    params = { ...params, captureBeyondViewport: true, clip: { x: 0, y: top + (clip.offset || 0), width: w, height: clip.height, scale: 1 } };
  }
  const shot = await send('Page.captureScreenshot', params);
  writeFileSync(OUT + name + '.' + (fmt === 'jpeg' ? 'jpg' : 'png'), Buffer.from(shot.data, 'base64'));
  console.log('✓', name, H);
  close();
}

await shoot({ name: 'hero-dark', w: 1440, h: 900, dpr: 1.5 });
await shoot({ name: 'hero-light', w: 1440, h: 900, dpr: 1.5, storage: { theme: 'light' } });
await shoot({ name: 'hero-light-en', w: 1440, h: 900, dpr: 1.5, storage: { theme: 'light', lang: 'en' } });
await shoot({ name: 'page-dark', w: 1440, h: 900, dpr: 1, clip: 'full', fmt: 'jpeg' });
await shoot({ name: 'projects', w: 1440, h: 900, dpr: 1.5, clip: { selector: '#projects', offset: 60, height: 1000 } });
await shoot({ name: 'case', w: 1440, h: 900, dpr: 1.5, hash: '#projet/diabetescope' });
await shoot({ name: 'palette', w: 1440, h: 900, dpr: 1.5, before: "window.dispatchEvent(new Event('open-palette'))" });
await shoot({ name: 'mobile', w: 390, h: 844, dpr: 2, mobile: true, clip: { maxH: 7600 }, fmt: 'jpeg' });

proc.kill();
process.exit(0);
