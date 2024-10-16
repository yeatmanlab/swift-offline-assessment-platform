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

// self.addEventListener('fetch', (event) => {
//   const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
// event.respondWith(caches.match(cacheKey).then(...));
// });

// in dev mode, we disable precaching to avoid caching issues
// if (import.meta.env.DEV) allowlist = [/^\/$/];
// matches for root, /play/:playerId, and /play/:playerId/task/:taskId
const allowlist = [/^\/$/, /^\/play\/[^/]+\/task\/[^/]+$/, /^\/play\/[^/]+$/]; // Add other routes here

//////////////////////////////////////////////////////////
// Init Event Listeners: Install, activate, fetch
// During the Install step, we cache our core assets
// During the Activate event, we cache our task assets
// During the Fetch event, we match requests with currently cached assets
//////////////////////////////////////////////////////////

// Establish a cache name
const coreCacheBaseName = "soap_offline_core_cache";
const taskCacheBaseName = "soap_offline_task_cache";
const cacheVersion = "v1";
const coreCacheName = `${coreCacheBaseName}-${cacheVersion}`;
const taskCacheName = `${taskCacheBaseName}-${cacheVersion}`;

precacheController.addToCacheList(self.__WB_MANIFEST);
precacheController.addToCacheList(precacheResources);
precacheController.addToCacheList(egmaTaskAssetsList);

self.addEventListener("install", (event) => {
  // event.waitUntil(
  //   precacheController.install(event).then((event) => {
  //     caches
  //       .open(coreCacheName)
  //       .then((cache) => cache.addAll(precacheResources));
  //   })
  // );
  event.waitUntil(
    caches.open(taskCacheName).then((cache) => {
      return cache.addAll(egmaTaskAssetsList);
    })
  );
});

// self.addEventListener("fetch", (event) => {
//   const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
//   event.respondWith(
//     caches.match(cacheKey).then(console.log("request matched"))
//   );
// });

// add task caches
self.addEventListener("activate", function (event) {
  self.skipWaiting();
  console.log("selfsoapactivate");
  // Passing in event is required in Workbox v6+
  event.waitUntil(precacheController.activate(event));

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

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("Cache hit for:", event.request.url);
        return cachedResponse;
      }
      // attempt to serve google bucket assets from cache, falling back to network if not
      // else if (
      //   event.request.url.startsWith("https://storage.googleapis.com/")
      // ) {
      //   const path = event.request.url.split("storage/")[1];
      //   const cacheKey = precacheController.getCacheKeyForURL(path);
      //   if (cacheKey) {
      //     return caches.match(cacheKey);
      //   } else {
      //     return fetch(event.request);
      //   }
      // }
      return fetch(event.request);
    })
  );
});

// registerRoute(new NavigationRoute(createHandlerBoundToURL("/"), { allowlist }));
