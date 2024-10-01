/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim, cacheNames } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

// self.__WB_MANIFEST is the default injection point
const precacheList = self.__WB_MANIFEST != null ? self.__WB_MANIFEST : []
precacheAndRoute(self.__WB_MANIFEST)

console.log("swself", self)
self.addEventListener('install', (event) => {
  console.log("swinstall", event)
  self.skipWaiting()
})

// clean old assets
cleanupOutdatedCaches()

/** @type {RegExp[] | undefined} */
let allowlist
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow to work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist },
))

self.skipWaiting()
clientsClaim()
