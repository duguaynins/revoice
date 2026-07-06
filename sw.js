self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      try {
        const response = await fetch(event.request);
        if (response && response.status === 200 && event.request.method === 'GET') {
          const clone = response.clone();
          const cache = await caches.open(String(Date.now()));
          cache.put(event.request, clone);
        }
        return response;
      } catch {
        const fallback = await caches.match('./index.html');
        return fallback || new Response('Offline', { status: 503 });
      }
    })()
  );
});
