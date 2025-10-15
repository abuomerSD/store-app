import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const messages = {
  en: en,
  ar: ar,
};

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: true, // Keep as true for Options API
  // globalInjection: true, // This enables $t in templates
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
  // missingWarn: false,
  // fallbackWarn: false,
});

export default i18n;
