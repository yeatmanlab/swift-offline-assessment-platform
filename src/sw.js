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
self.clientsClaim();

// clean old assets
cleanupOutdatedCaches();

// self.__WB_MANIFEST is the default injection point
// add various pages and components to cachelisa

const precacheController = new PrecacheController();

// add levante task assets
console.log("taskAssetsList", taskAssets);
precacheController.addToCacheList(egmaTaskAssetsList)
precacheController.addToCacheList(self.__WB_MANIFEST)


// self.addEventListener('fetch', (event) => {
//   const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
// event.respondWith(caches.match(cacheKey).then(...));
// });


/** @type {RegExp[] | undefined} */
let allowlist;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

// Init Event Listeners: Install, activate, fetch
// During the Install step, we cache our core assets
// During the Activate event, we cache our task assets
// During the Fetch event, we match requests with currently cached assets

// Establish a cache name
const coreCacheBaseName = 'soap_offline_core_cache';
const taskCacheBaseName = 'soap_offline_task_cache';
const cacheVersion = 'v1';
const coreCacheName = `${taskCacheBaseName}-${cacheVersion}`;
const taskCacheName = `${coreCacheBaseName}-${cacheVersion}`;

self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Opened cache');
      return cache.addAll([
        'src/offline.html',
      ]);
    })
  );
})

// make sure to remove old caches
addEventListener('activate', function (event) {
  event.waitUntil(
      caches.keys().then(function (keys) { 
          return Promise.all(keys
              .filter(key => key !== coreCacheName && key !== taskCacheName)
              .map(key => caches.delete(key))
          )
      })
  )
});

self.addEventListener('fetch', (event) => {
  // Check if this is a request for an image
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});

// Handle images:
const imageRoute = new Route(
  ({ request }) => {
    return request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "images",
  })
);

// Handle scripts:
const scriptsRoute = new Route(
  ({ request }) => {
    return request.destination === "audio";
  },
  new CacheFirst({
    cacheName: "audio",
  })
);

// Handle styles:
const stylesRoute = new Route(
  ({ request }) => {
    return request.destination === "video";
  },
  new CacheFirst({
    cacheName: "video",
  })
);


console.log("caching images, audio, and video");
// handle images 
registerRoute(
  /.+\.png/, 

  new CacheFirst({ // OPAQUE -> only possibility = StaleWhileRevalidate or NetworkFirst. CacheFirst won't work
    cacheName: cacheName,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 500,
      })
    ],
  })
);

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);

registerRoute(
  ({ url }) => url.origin === "https://storage.googleapis.com/",
  new CacheFirst({
    cacheName: "bucketAssets",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 365 * 24 * 60 * 60, // keep cache for a year
      }),
    ],
  })
);

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
