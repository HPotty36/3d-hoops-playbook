// PWA: 설치(manifest)와 오프라인(서비스 워커)이 페이지와 어긋나지 않게
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const sw = readFileSync('sw.js', 'utf8');

// PNG 머리(IHDR)에서 가로·세로를 읽는다
function pngSize(file) {
  const b = readFileSync(file);
  assert.equal(b.toString('latin1', 1, 4), 'PNG', `${file} is a PNG`);
  return `${b.readUInt32BE(16)}x${b.readUInt32BE(20)}`;
}

test('the page links the manifest and an Apple touch icon', () => {
  assert.match(html, /<link rel="manifest" href="manifest\.webmanifest"/);
  const icon = html.match(/<link rel="apple-touch-icon" href="([^"]+)"/);
  assert.ok(icon, 'apple-touch-icon link');
  assert.equal(pngSize(icon[1]), '180x180');
});

test('the manifest makes the site installable', () => {
  const m = JSON.parse(readFileSync('manifest.webmanifest', 'utf8'));
  assert.equal(m.name, '3D Hoops Playbook');
  assert.ok(m.short_name && m.short_name.length <= 15, 'short_name fits under a home-screen icon');
  assert.equal(m.start_url, './');
  assert.equal(m.scope, './');
  assert.equal(m.display, 'standalone');
  const sizes = (purpose) => m.icons.filter((i) => (i.purpose || 'any').split(' ').includes(purpose)).map((i) => i.sizes);
  assert.ok(sizes('any').includes('192x192') && sizes('any').includes('512x512'), 'any-purpose 192 and 512 icons');
  assert.ok(sizes('maskable').includes('512x512'), 'maskable 512 icon');
  for (const i of m.icons) {
    assert.equal(i.type, 'image/png', i.src);
    assert.ok(existsSync(i.src), `${i.src} exists`);
    assert.equal(pngSize(i.src), i.sizes, `${i.src} size`);
  }
});

// 오프라인에서 3D가 뜨려면, 페이지가 불러오는 외부 리소스(스타일시트, import map)의 호스트를 서비스 워커가 모두 캐시해야 한다
test('the service worker caches every external host the page loads', () => {
  const importmap = JSON.parse(html.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]);
  const urls = [
    ...[...html.matchAll(/<link [^>]*rel="stylesheet"[^>]*>/g)].map((m) => m[0].match(/href="([^"]+)"/)[1]),
    ...Object.values(importmap.imports || {}),
  ].filter((u) => u.startsWith('https://'));
  const hosts = new Set(urls.map((u) => new URL(u).hostname));
  // Google Fonts 스타일시트는 글꼴 파일을 다른 호스트에서 불러온다
  if (hosts.has('fonts.googleapis.com')) hosts.add('fonts.gstatic.com');
  assert.ok(hosts.size > 0, 'found external resources');
  for (const h of hosts) assert.ok(sw.includes(`'${h}'`), `sw.js caches ${h}`);
});

// crossorigin 없이 불러온 스타일시트는 내용을 볼 수 없는 응답(opaque)이라 캐시하기 어렵다
test('cross-origin stylesheets are requested with CORS', () => {
  for (const [tag] of html.matchAll(/<link [^>]*rel="stylesheet"[^>]*>/g)) {
    if (/href="https:/.test(tag)) assert.match(tag, /\bcrossorigin\b/, tag);
  }
});

test('the service worker is registered on the web only, never in the store app', () => {
  const reg = html.match(/<script>[^<]*serviceWorker[^<]*<\/script>/);
  assert.ok(reg, 'registration script');
  assert.match(reg[0], /register\('sw\.js'\)/);
  assert.match(reg[0], /dataset\.build/, 'skips the store build');
});

// 첫 방문의 파일은 서비스 워커가 페이지를 제어하기 전에 불러오므로, 페이지가 목록을 넘겨 캐시하게 해야 한 번 방문으로 오프라인이 된다
test('the page hands the service worker the files it loaded before it took control', () => {
  const reg = html.match(/<script>[^<]*serviceWorker[^<]*<\/script>/)[0];
  assert.match(reg, /getEntriesByType\('resource'\)/);
  assert.match(reg, /postMessage\(\{ type: 'cache-urls'/);
  assert.match(sw, /addEventListener\('message'/);
  assert.match(sw, /'cache-urls'/);
});

test('the service worker keeps the app shell and drops old caches', () => {
  for (const f of ["'./'", "'./manifest.webmanifest'"]) assert.ok(sw.includes(f), `precaches ${f}`);
  assert.match(sw, /caches\.delete/);
});
