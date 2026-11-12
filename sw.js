// 3D Hoops Playbook 오프라인 캐시 (PWA).
// 온라인이면 늘 네트워크에서 새로 받아 캐시에 넣고(그래서 배포하면 바로 반영된다), 오프라인이면 캐시를 쓴다.
// 첫 화면에서 모든 작전 모듈과 Three.js, 글꼴을 불러오므로, 한 번 열어 보면 모든 작전이 오프라인에서 돈다.
// 아래 SHELL 파일(아이콘·매니페스트)이나 캐시 방식이 바뀌면 CACHE 버전을 올린다(옛 캐시는 activate에서 지운다).
const CACHE = 'hoops-playbook-v2';
const SHELL = [
  './',
  './manifest.webmanifest',
  './assets/logo-mark.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-maskable-512.png',
  './assets/apple-touch-icon.png',
];
// 페이지가 불러오는 외부 리소스: Three.js와 Pretendard(jsDelivr), Rubik(Google Fonts)
const CDN = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// 첫 방문에는 서비스 워커가 페이지를 아직 제어하지 않아, 그동안 불러온 작전 모듈·스타일·Three.js·글꼴이 캐시되지 않는다.
// 그래서 페이지가 자기가 불러온 파일 목록을 보내 주면, 아직 없는 것만 받아 캐시에 넣는다
const cacheable = (u) => { const url = new URL(u, self.location.href); return url.origin === self.location.origin || CDN.includes(url.hostname); };
self.addEventListener('message', (e) => {
  if (e.data?.type !== 'cache-urls' || !Array.isArray(e.data.urls)) return;
  const urls = [...new Set(e.data.urls.filter((u) => typeof u === 'string' && cacheable(u)))];
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(urls.map((u) => c.match(u).then((hit) => hit
    || fetch(u).then((res) => (res.status === 200 ? c.put(u, res) : null)).catch(() => null))))));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const own = url.origin === self.location.origin;
  if (!own && !CDN.includes(url.hostname)) return;
  // 페이지는 주소(?t= ?read= ?lang=)가 달라도 같은 파일이므로 './' 하나로 저장한다 (딥 링크마다 사본이 쌓이지 않게)
  const nav = req.mode === 'navigate';
  e.respondWith(
    fetch(req).then((res) => {
      if (res.status === 200) {
        const copy = res.clone();
        e.waitUntil(caches.open(CACHE).then((c) => c.put(nav ? './' : req, copy)).catch(() => {}));
      }
      return res;
    }).catch(() => (nav ? caches.match('./') : caches.match(req, { ignoreSearch: own }))
      .then((hit) => hit || Response.error())),
  );
});
