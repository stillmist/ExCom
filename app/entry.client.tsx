import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

import { registerSW } from "virtual:pwa-register";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline");

    // Optional: Test offline capability
    if (!navigator.onLine) {
      console.log("Currently offline - service worker should handle this");
    }
  },
  onRegisteredSW(swUrl, registration) {
    console.log("Service Worker registered:", registration);

    // Check if service worker is controlling the page
    if (registration?.active) {
      console.log("Service Worker is active and controlling the page");
    }
  },
});

// Test offline functionality
window.addEventListener("offline", () => {
  console.log(
    "Network is offline - service worker should serve cached content",
  );
});
