/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute, PrecacheController } from 'workbox-precaching'
import { clientsClaim, cacheNames } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import {CacheFirst, NetworkFirst} from 'workbox-strategies';
// add pages to app assets

// self.__WB_MANIFEST is the default injection point
// add various pages and components to cachelisa
precacheAndRoute(self.__WB_MANIFEST)

console.log("swself", self)
self.addEventListener('install', (event) => {
  console.log("swinstall", event)
  self.skipWaiting()
})

// self.addEventListener('fetch'), (event) => {
//   console.log("swfetch", event)
// }

// clean old assets
cleanupOutdatedCaches()

/** @type {RegExp[] | undefined} */
let allowlist
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV)
  allowlist = [/^\/$/]


registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist },
))


// registerRoute(({url}) => url.pathname.startsWith('/play/'), new NetworkFirst());

// registerRoute(
//   ({ request }) => request.destination === "image",
//   new CacheFirst({
//     cacheName: "images",
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 7 * 24 * 60 * 60, // cache the images for only 7 Days
//       }),
//     ],
//   })
// );



self.skipWaiting()
clientsClaim()
