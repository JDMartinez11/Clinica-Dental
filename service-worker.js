const CACHE_NAME = 'dental-clinic-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abriendo caché...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker: elimina las versiones anteriores del caché
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Eliminando caché obsoleto: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Manejo de las solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Si el archivo está en caché, devuélvelo
        }
        return fetch(event.request) // Si no está en caché, realiza la solicitud de red
          .then(fetchedResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, fetchedResponse.clone()); // Guarda en caché la nueva respuesta
              return fetchedResponse;
            });
          });
      })
  );
});
