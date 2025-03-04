// Define cache names
const CACHE_NAME = 'pwa-cache-v1';
const API_CACHE = 'api-cache-v1';
const STATIC_ASSETS = [];

self.addEventListener('install', async (event) => {
    const cache = await caches.open('pwa-cache-v1');
    
    // Get the service worker's scope (base path)
    const scope = self.registration.scope;
    const basePath = new URL(scope).pathname; // This will be '/teech/' on GitHub Pages

    STATIC_ASSETS.push('',
        'index.html',
        'main.css',
        'main.js',
        'assets/media/icons/favicon/favicon.ico');
    STATIC_ASSETS.map(path => basePath + path); // Prepend base path to each asset

    event.waitUntil(cache.addAll(STATIC_ASSETS));
});

// Install event - Cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME && key !== API_CACHE) {
                        console.log('Deleting old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch event - Cache strategy
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // API requests - Network first, fallback to cache
    if (url.origin !== location.origin) {
        event.respondWith(
            fetch(event.request).then(response => {
                return caches.open(API_CACHE).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            }).catch(() => caches.match(event.request))
        );
        return;
    }

    // Static files - Cache first, fallback to network
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Push notification event
self.addEventListener('push', event => {
    const options = {
        body: 'You have a new notification!',
        icon: '/logo.png',
        badge: '/badge.png'
    };
    event.waitUntil(self.registration.showNotification('New Message', options));
});

// Background sync event
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(
            fetch('/sync-endpoint', { method: 'POST' })
                .then(response => console.log('Background sync successful'))
                .catch(error => console.log('Background sync failed', error))
        );
    }
});

// Notify user when an update is available
self.addEventListener('message', event => {
    if (event.data === 'update-sw') {
        self.skipWaiting();
    }
});
