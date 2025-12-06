import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    // Output build directory
    build: {
      outDir: "build/client",
      sourcemap: false, // Disable sourcemaps for better PWA
      rollupOptions: {
        output: {
          manualChunks: undefined, // Keep chunks together for better caching
        },
      },
    },

    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
          type: "module",
        },
        includeAssets: ["favicon.ico"],
        manifest: {
          name: "ExCom",
          short_name: "ExCom",
          description: "Panel for ExCom",
          theme_color: "#000000",
          background_color: "#ffffff",
          display: "standalone",
          orientation: "portrait",
          start_url: "/",
          scope: "/",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
          ],
        },

        workbox: {
          globPatterns: [
            "**/*.{js,css,html,ico,png,svg,jpg,gif,json,woff,woff2,ttf,eot}",
          ],
          additionalManifestEntries: [{ url: "index.html", revision: null }],
          navigateFallback: isProduction ? "/index.html" : undefined,
          navigateFallbackAllowlist: [/^(?!\/__).*/], // Allow all except __* paths
          // Don't cache API routes
          navigateFallbackDenylist: [/^\/api/, /^\/auth/, /^\/_/],
          runtimeCaching: [
            // Cache navigation requests for SPA
            {
              urlPattern: /\.(?:js|css|html)$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "static-resources",
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "static-assets",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
            {
              urlPattern: ({ request }) => request.mode === "navigate",
              handler: "NetworkFirst",
              options: {
                cacheName: "pages-cache",
                networkTimeoutSeconds: 3,
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],

          // Skip waiting for activate
          skipWaiting: true,
          clientsClaim: true,
          cleanupOutdatedCaches: true,
        },
      }),
    ],
  };
});
