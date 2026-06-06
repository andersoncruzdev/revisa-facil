import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const srcPath = (path: string) => new URL(`./src/${path}`, import.meta.url).pathname;
const rootPath = (path: string) => new URL(`./${path}`, import.meta.url).pathname;

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@app": srcPath("app"),
      "@assets": srcPath("assets"),
      "@data": srcPath("data"),
      "@features": srcPath("features"),
      "@hooks": srcPath("hooks"),
      "@pages": srcPath("pages"),
      "@services": srcPath("services"),
      "@shared": srcPath("shared"),
      "@test": rootPath("test"),
      "@types-app": srcPath("types"),
      "@utils": srcPath("utils"),
    },
  },
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    css: true,
  },
});
