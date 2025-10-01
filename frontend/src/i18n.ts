import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // default language
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react
    },
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
  });

export default i18n;
