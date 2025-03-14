// Define cache names
const CACHE_NAME = "pwa-cache-v2"; // Updated cache name to trigger updates
const API_CACHE = "api-cache-v1";

self.addEventListener("install", (event) => {
	// Get the service worker's scope (base path)
	const scope = self.registration.scope;
	const basePath = new URL(scope).pathname; // This will be '/teech/' on GitHub Pages

	// Define static assets
	const staticAssets = [
		"",
		"index.html",
		"main.css",
		"main.js",
		"assets/media/icons/favicon/favicon.ico",
		"assets/media/icons/home-primary-400-active.png",
		"assets/media/icons/home-primary-500-active.png",
		"assets/media/icons/home-secondary-400.png",
		"assets/media/icons/home-secondary-500.png",
		"assets/media/icons/classes-primary-400-active.png",
		"assets/media/icons/classes-primary-500-active.png",
		"assets/media/icons/classes-secondary-400.png",
		"assets/media/icons/classes-secondary-500.png",
		"assets/media/icons/students-primary-400-active.png",
		"assets/media/icons/students-primary-500-active.png",
		"assets/media/icons/students-secondary-400.png",
		"assets/media/icons/students-secondary-500.png",
		"assets/media/icons/summary-primary-400-active.png",
		"assets/media/icons/summary-primary-500-active.png",
		"assets/media/icons/summary-secondary-400.png",
		"assets/media/icons/summary-secondary-500.png",
	].map((path) => basePath + path); // Prepend base path to each asset

	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			console.log("Caching static assets:", staticAssets);
			await cache.addAll(staticAssets);
		})()
	);
	self.skipWaiting();
});

// Activate event - Clean up old caches and claim clients
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.map((key) => {
					if (key !== CACHE_NAME && key !== API_CACHE) {
						console.log("Deleting old cache:", key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	self.clients.claim(); // Take control of open clients immediately
});

// Fetch event - Cache strategy
self.addEventListener("fetch", (event) => {
	const url = new URL(event.request.url);

	// API requests - Network first, fallback to cache
	if (
		url.origin !== location.origin &&
		event.request.url.startsWith("http")
	) {
		event.respondWith(
			fetch(event.request)
				.then((response) => {
					if (!response || response.status !== 200) {
						throw new Error("Network response invalid");
					}
					return caches.open(API_CACHE).then((cache) => {
						cache.put(event.request, response.clone());
						return response;
					});
				})
				.catch(() =>
					caches
						.match(event.request)
						.then(
							(response) =>
								response ||
								new Response("Offline", { status: 503 })
						)
				)
		);
		return;
	}

	// Static files - Cache first, fallback to network
	event.respondWith(
		caches.match(event.request).then((response) => {
			return (
				response ||
				fetch(event.request).catch(() => {
					return caches.match("/teech/index.html"); // Serve a fallback page when offline
				})
			);
		})
	);
});

// Push notification event
self.addEventListener("push", (event) => {
	const options = {
		body: "You have a new notification!",
		icon: "/logo.png",
		badge: "/badge.png",
	};
	event.waitUntil(self.registration.showNotification("New Message", options));
});

// Background sync event
self.addEventListener("sync", (event) => {
	if (event.tag === "sync-data") {
		event.waitUntil(
			fetch("/sync-endpoint", { method: "POST" })
				.then((response) => console.log("Background sync successful"))
				.catch((error) => console.log("Background sync failed", error))
		);
	}
});

// Notify user when an update is available and apply updates immediately
self.addEventListener("message", async (event) => {
	if (event.data === "update-sw") {
		await self.skipWaiting();
		const clients = await self.clients.matchAll({ type: "window" });

		if (clients.length === 0) {
			console.warn("No active clients found to refresh.");
			return;
		}

		clients.forEach((client) => {
			if (client.url && "navigate" in client) {
				client.navigate(client.url);
			} else {
				console.warn(
					"Skipping client without navigation support:",
					client
				);
			}
		});
	}
});
