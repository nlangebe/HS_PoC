import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all translation JSON files
import enTranslation from "./locales/en/translation.json";
import frTranslation from "./locales/fr/translation.json";
import deTranslation from "./locales/de/translation.json";
import itTranslation from "./locales/it/translation.json";
import noTranslation from "./locales/no/translation.json";
import svTranslation from "./locales/sv/translation.json";
import plTranslation from "./locales/pl/translation.json";
import daTranslation from "./locales/da/translation.json";

i18n
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next) // Bind i18next to React
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      it: { translation: itTranslation },
      no: { translation: noTranslation },
      sv: { translation: svTranslation },
      pl: { translation: plTranslation },
      da: { translation: daTranslation },
    },
  });

export default i18n;
