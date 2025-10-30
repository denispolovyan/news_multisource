import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const crypto = require('crypto')


// https://vite.dev/config/
export default defineConfig({
  base: "/news_multisource/",
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    'crypto': crypto,
  },
});