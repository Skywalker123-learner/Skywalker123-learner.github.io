const CACHE_NAME = 'pomodoro-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  './launchericon-192x192.png',
  './launchericon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // activates the new SW immediately
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
