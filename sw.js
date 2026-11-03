// 3D Hoops Playbook 오프라인 캐시 (PWA).
// 온라인이면 늘 네트워크에서 새로 받아 캐시에 넣고(그래서 배포하면 바로 반영된다), 오프라인이면 캐시를 쓴다.
// 첫 화면에서 모든 작전 모듈과 Three.js, 글꼴을 불러오므로, 한 번 열어 보면 모든 작전이 오프라인에서 돈다.
// 아래 SHELL 파일(아이콘·매니페스트)이 바뀌면 CACHE 버전을 올린다.
const CACHE = 'hoops-playbook-v1';
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

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const own = url.origin === self.location.origin;
  if (!own && !CDN.includes(url.hostname)) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: own })
      // ?read=…#작전 같은 딥 링크도 오프라인에서는 첫 화면으로 연다
      .then((hit) => hit || (req.mode === 'navigate' ? caches.match('./') : Response.error()))),
  );
});
