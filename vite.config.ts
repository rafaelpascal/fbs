import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// Export the Vite configuration
export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      manifest: false,
      srcDir: "src",
      filename: "manifest.json",
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/src/pages/auth/")) {
            return "auth-chunk";
          }
          if (id.includes("/src/pages/Courses/")) {
            return "courses-chunk";
          }
        },
      },
    },
  },
});
