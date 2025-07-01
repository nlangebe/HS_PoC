import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface AppConfigurationModalProps {
  onClose: () => void;
  countryOfUse: string;
  setCountryOfUse: (country: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const countries = [
  "USA",
  "Canada",
  "United Kingdom",
  "Norway",
  "Poland",
  "Germany",
  "Denmark",
  "France",
  "Austria",
  "New Zealand",
  "Sweden",
  "Italy",
  "Australia",
];

// Map countries to language codes (matching your i18n codes)
const countryLanguageMap: Record<string, string> = {
  USA: "en",
  Canada: "en",
  "United Kingdom": "en",
  Australia: "en",
  "New Zealand": "en",
  France: "fr",
  Germany: "de",
  Poland: "pl",
  Italy: "it",
  Austria: "de",
  Sweden: "sv",
  Norway: "no",
  Denmark: "da",
  "": "en", // fallback
};

const euCountries = [
  "France",
  "Germany",
  "Poland",
  "Italy",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "United Kingdom",
];

const languageDisplayMap: Record<string, string> = {
  en: "English",
  fr: "French",
  de: "German",
  it: "Italian",
  no: "Norwegian",
  sv: "Swedish",
  pl: "Polish",
  da: "Danish",
};

const AppConfigurationModal: React.FC<AppConfigurationModalProps> = ({
  onClose,
  countryOfUse,
  setCountryOfUse,
  language,
  setLanguage,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  // Track if language was manually changed by user to avoid auto overwrite
  const [languageManuallyChanged, setLanguageManuallyChanged] = useState(false);

  // Close modal on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // When country changes, reset language to default for country,
  // and reset manual override flag (so language updates accordingly)
  useEffect(() => {
    if (!languageManuallyChanged) {
      const autoLang = countryLanguageMap[countryOfUse] || "en";
      if (language !== autoLang) {
        setLanguage(autoLang);
        i18n.changeLanguage(autoLang);
      }
    }
  }, [countryOfUse, languageManuallyChanged, setLanguage, i18n]);

  // Update i18n language when language state changes
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Handle manual language change by user
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang); // Update app state and i18n
    setLanguageManuallyChanged(true); // Mark manual override
  };

  // Design Standard logic
  const designStandard =
    countryOfUse === "USA"
      ? "NDS 2018"
      : countryOfUse === "Canada"
      ? "CSA 086:19"
      : euCountries.includes(countryOfUse)
      ? "EN 1995-1-1"
      : "-";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-4 relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          aria-label={t("appConfigurationModal.close")}
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {t("appConfigurationModal.title")}
        </h2>

        <div className="grid grid-cols-5 gap-4 items-center text-sm">
          {/* Country of Use */}
          <label htmlFor="useCountry" className="col-span-1 font-medium">
            {t("appConfigurationModal.countryOfUse")}
          </label>
          <select
            id="useCountry"
            value={countryOfUse}
            onChange={(e) => {
              setCountryOfUse(e.target.value);
              setLanguageManuallyChanged(false); // reset manual override to allow auto lang update
            }}
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Country of Purchase */}
          <label htmlFor="purchaseCountry" className="col-span-1 font-medium">
            {t("appConfigurationModal.countryOfPurchase")}
          </label>
          <select
            id="purchaseCountry"
            value={countryOfUse} // Disabled, so fixed to countryOfUse for simplicity
            disabled={countryOfUse === "USA" || countryOfUse === "Canada"}
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full disabled:bg-gray-100 disabled:text-gray-500"
            onChange={() => {}}
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Language */}
          <label htmlFor="language" className="col-span-1 font-medium">
            {t("Language")}
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full"
          >
            {Object.entries(languageDisplayMap).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          {/* Design Standard */}
          <label className="col-span-1 font-medium">
            {t("appConfigurationModal.designStandard")}
          </label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value={designStandard}
            disabled
          />

          {/* Design Method */}
          <label className="col-span-1 font-medium">
            {t("appConfigurationModal.designMethod")}
          </label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value={t("appConfigurationModal.designMethodValue")}
            disabled
          />

          {/* Unit */}
          <label className="col-span-1 font-medium">
            {t("appConfigurationModal.unit")}
          </label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value={t("appConfigurationModal.unitValue")}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default AppConfigurationModal;
