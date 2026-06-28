///在這裡完成PWA的控制

///v0
self.addEventListener('install', event => {
  console.log('Service Worker install');
  self.skipWaiting(); // 立即進入 activate
});

self.addEventListener('activate', event => {
  console.log('Service Worker activate');
  event.waitUntil(clients.claim()); // 接管所有頁面
});

self.addEventListener('fetch', event => {
});
/*
self.addEventListener('fetch', event => {
  console.log('Service Worker fetch');
  event.respondWith(
    fetch(event.request) // 直接走網路
      .catch(() => caches.match(event.request)) // 網路失敗時才用快取
  );
});

self.addEventListener('push', event => {
});  ///20260307

self.addEventListener("notificationclick", function (event) {
});  */

const display = "minimal-ui, browser, standalone, fullscreen"; 
