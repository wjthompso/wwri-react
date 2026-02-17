/// <reference types="vitest" />
import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

function copyPublicWebsiteMockupAssetsPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig | undefined;

  return {
    name: "copy-public-website-mockup-assets",
    apply: "build",
    configResolved(config) {
      resolvedConfig = config;
    },
    writeBundle() {
      if (!resolvedConfig) {
        return;
      }

      const sourceDir = path.resolve(resolvedConfig.root, "public-website-mockups/assets");
      const outputDir = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
      const targetDir = path.resolve(outputDir, "public-website-mockups/assets");

      if (!fs.existsSync(sourceDir)) {
        console.warn(
          "[copy-public-website-mockup-assets] Source directory not found:",
          sourceDir,
        );
        return;
      }

      fs.mkdirSync(path.dirname(targetDir), { recursive: true });
      fs.cpSync(sourceDir, targetDir, { recursive: true });
    },
  };
}

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths(), copyPublicWebsiteMockupAssetsPlugin()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ".vitest/setup",
    include: ["**/test.{ts,tsx}"],
  },
  css: {
    postcss: "./postcss.config.mjs",
  },
});
