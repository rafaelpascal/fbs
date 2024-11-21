// import { defineConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
// export default defineConfig({
//   plugins: [],
// });
export default defineConfig({
    plugins: [
        tsconfigPaths(),
        react(),
        VitePWA({
            manifest: false,
            srcDir: "src",
            filename: "manifest.json",
            workbox: {
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
            },
        }),
    ],
});
