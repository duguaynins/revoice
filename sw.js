self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        // 1. 先走網路拿最新檔案
        // 2. 💡 成功拿到新檔案後，直接 put 進去。這時如果裡面有同名檔案，就會直接被覆蓋更新！
        const response = await fetch(event.request);
        
        if (response && response.status === 200 && event.request.method === 'GET') {
          const clone = response.clone();
          const cache = await caches.open("nins");
          
          ///cache.put(event.request, clone); 
          await cache.put(event.request, clone);
        }
        return response;
      } catch {
        // 3. 只有當網路失敗（斷網）時，才去挖快取箱子裡的檔案出來救援
        const cached = await caches.match(event.request);
        if (cached) return cached;
        
        const fallback = await caches.match('./index.html');
        return fallback || new Response('Offline', { status: 503 });
      }
    })()
  );
});

