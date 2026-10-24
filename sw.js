// GiÃºp á»©ng dá»¥ng má»Ÿ Ä‘Æ°á»£c khi khÃ´ng cÃ³ máº¡ng: lÆ°u sáºµn cÃ¡c tá»‡p chÃ­nh.
const CORE = 'tu-vung-core-v5';
const FILES = ['./', 'index.html', 'tu-vung.js', 'tieng-viet.js', 'am-thanh.js', 'chu-han.js', 'net-viet.js', 'ngu-phap.js', 'np-am.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CORE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Æ¯u tiÃªn báº£n má»›i trÃªn máº¡ng, máº¥t máº¡ng thÃ¬ dÃ¹ng báº£n Ä‘Ã£ lÆ°u (ká»ƒ cáº£ phÃ´ng chá»¯).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CORE).then(x => x.put(e.request, c)); } return r; }).catch(() => caches.match(e.request)));
});
