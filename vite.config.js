import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import mkcert from "vite-plugin-mkcert";
import { inject } from "vue";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.platform": JSON.stringify(process.platform),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    symlinks: false,
    reserveSymlinks: true,
  },
  plugins: [
    vue(),
    mkcert(),
    VitePWA({
      injectRegister: "auto",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      manifest: {
        name: "Swift Offline Assessment Platform",
        short_name: "soap",
        description: "Offline Assessing",
        theme_color: "#ffffff",

        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      injectManifest: {
        globPatterns: [
          "src/assets/**/*.{js,css,html,svg,png,ico,vue}",
          "src/pages/**/*.{js,css,html,svg,png,ico,vue}",
          "src/components/**/*.{js,css,html,svg,png,ico,vue}",
          "src/store/**/*.{js,css,html,svg,png,ico,vue}",
          "src/router/**/*.{js,css,html,svg,png,ico,vue}",
          "src/core-tasks/task-launcher/src/**/*.{js,css,html,svg,png,ico,vue}",
          // "**/*.{js,css,html,svg,png,ico,vue}"],
        ]
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: false,
        type: "module",
      },
    }),
  ],
});
