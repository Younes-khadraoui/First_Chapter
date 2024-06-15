import { defineConfig, UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((): UserConfig => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    optimizeDeps: { include: ['@auth/core'] },

    build: {
      outDir: 'dist', // Specify the output directory for the built files
      assetsDir: 'src/assets', // Specify the directory for static assets
    },
  };
});
