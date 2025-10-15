import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(__dirname, "src/locales/**"),
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    }),
  ],
  build: {
    // Ensure JSON files are properly processed
    assetsInclude: ["**/*.json"],
  },
});
