import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detect user language automatically
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    resources: {
      en: {
        translation: require("./locales/en/translation.json"),
      },
      fr: {
        translation: require("./locales/fr/translation.json"),
      },
      de: {
        translation: require("./locales/de/translation.json"),
      },
      it: {
        translation: require("./locales/it/translation.json"),
      },
      no: {
        translation: require("./locales/no/translation.json"),
      },
      sv: {
        translation: require("./locales/sv/translation.json"),
      },
      pl: {
        translation: require("./locales/pl/translation.json"),
      },
      da: {
        translation: require("./locales/da/translation.json"),
      },
    },
  });

export default i18n;
