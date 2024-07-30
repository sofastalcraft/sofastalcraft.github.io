const CACHE_NAME = 'dynamic-assets-cache-v1';  // Updated cache name for clarity

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Modify the condition to cache requests to CSS, JS, and media folders
  if (requestUrl.pathname.startsWith('/static/media/') ||
      requestUrl.pathname.startsWith('/static/css/') ||
      requestUrl.pathname.startsWith('/static/js/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(responseToCache => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache.clone());
            return responseToCache;
          });
        });
      })
    );
  }
});
