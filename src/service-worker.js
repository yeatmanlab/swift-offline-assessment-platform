/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
  PrecacheController,
} from "workbox-precaching";
import { clientsClaim, cacheNames } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { egmaTaskAssetsList, taskAssetsList } from "./taskAssetsList";

self.skipWaiting();

// Allow service worker to controll clients after activation
clientsClaim();

// remove old caches
cleanupOutdatedCaches();

const precacheResources = [
  "/",
  "/index.html",
  "/src/main.js",
  "/src/App.vue",
  "/src/pages/Home.vue",
  "/src/pages/PlayerLauncher.js",
];
const precacheController = new PrecacheController();

// add levante task assets
// self.__WB_MANIFEST is the default injection point
precacheController.addToCacheList(self.__WB_MANIFEST);
precacheController.addToCacheList(egmaTaskAssetsList);

// self.addEventListener('fetch', (event) => {
//   const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
// event.respondWith(caches.match(cacheKey).then(...));
// });

// in dev mode, we disable precaching to avoid caching issues
// if (import.meta.env.DEV) allowlist = [/^\/$/];
// matches for root, /play/:playerId, and /play/:playerId/task/:taskId
const allowlist = [/^\/$/, /^\/play\/[^/]+\/task\/[^/]+$/, /^\/play\/[^/]+$/]; // Add other routes here

// Init Event Listeners: Install, activate, fetch
// During the Install step, we cache our core assets
// During the Activate event, we cache our task assets
// During the Fetch event, we match requests with currently cached assets

// Establish a cache name
const coreCacheBaseName = "soap_offline_core_cache";
const taskCacheBaseName = "soap_offline_task_cache";
const cacheVersion = "v1";
const coreCacheName = `${coreCacheBaseName}-${cacheVersion}`;
const taskCacheName = `${taskCacheBaseName}-${cacheVersion}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    precacheController.install(event).then((event) => {
      event.waitUntil(
        caches
          .open(coreCacheName)
          .then((cache) => cache.addAll(precacheResources))
      );
    })
  );
});

// make sure to remove old caches
self.addEventListener("activate", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter((key) => key !== coreCacheName && key !== taskCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// add task caches
self.addEventListener("activate", function (event) {
  console.log("selfsoapactivate");
  self.skipWaiting();
  event.waitUntil(
    event.waitUntil(
      caches.open(taskCacheName).then((cache) => {
        return cache.addAll(egmaTaskAssetsList);
      })
    )
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

// registerRoute(
//   new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
// );

// registerRoute(new NavigationRoute(createHandlerBoundToURL("/"), { allowlist }));

// self.addEventListener('fetch', (event) => {
//   // Check if this is a request for an image
//   if (event.request.destination === 'image') {
//     event.respondWith(caches.open(cacheName).then((cache) => {
//       // Go to the cache first
//       return cache.match(event.request.url).then((cachedResponse) => {
//         // Return a cached response if we have one
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         // Otherwise, hit the network
//         return fetch(event.request).then((fetchedResponse) => {
//           // Add the network response to the cache for later visits
//           cache.put(event.request, fetchedResponse.clone());

//           // Return the network response
//           return fetchedResponse;
//         });
//       });
//     }));
//   } else {
//     return;
//   }
// });

// registerRoute(
//   ({ url }) => url.origin === "https://storage.googleapis.com/",
//   new CacheFirst({
//     cacheName: "bucketAssets",
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 365 * 24 * 60 * 60, // keep cache for a year
//       }),
//     ],
//   })
// );

// registerRoute(
//   ({ request }) => request.destination === "image",
//   new CacheFirst({
//     cacheName: "images",
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 7 * 24 * 60 * 60,  // keep cache for a year
//       }),
//     ],
//   })
// );
