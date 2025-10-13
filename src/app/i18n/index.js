import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslations from "./locales/en.js";
import hiTranslations from "./locales/hi.js";
import maiTranslations from "./locales/mai.js";

const resources = {
  en: {
    translation: enTranslations,
  },
  hi: {
    translation: hiTranslations,
  },
  mai: {
    translation: maiTranslations,
  },
};

// Initialize i18n
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "en", // Default language
      fallbackLng: "en",
      debug: false,

      interpolation: {
        escapeValue: false, // React already escapes values
      },

      // Custom language names for display
      load: "languageOnly",

      // Namespace configuration
      defaultNS: "translation",
      ns: ["translation"],

      react: {
        useSuspense: false, // Disable suspense to avoid SSR issues
      },
    });
}

export default i18n;
