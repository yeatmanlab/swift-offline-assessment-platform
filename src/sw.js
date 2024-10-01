/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
  PrecacheController,
} from "workbox-precaching";
import { clientsClaim, cacheNames } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing"a

self.skipWaiting();
self.clientsClaim();


// self.__WB_MANIFEST is the default injection point
// add various pages and components to cachelisa
precacheAndRoute(self.__WB_MANIFEST);

const precacheController = new PrecacheController();

// add levante task assets
console.log("taskAssetsList", taskAssets);

precacheController.addToCacheList(taskAssetsList);
console.log("precachecontroller", precacheController);

console.log("swself", self);
self.addEventListener("install", (event) => {
  console.log("swinstall", event);
  self.skipWaiting();
});

// self.addEventListener('fetch', (event) => {
//   const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
  // event.respondWith(caches.match(cacheKey).then(...));
// });


// clean old assets
cleanupOutdatedCaches();

/** @type {RegExp[] | undefined} */
let allowlist;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist })
);

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
    ]
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

