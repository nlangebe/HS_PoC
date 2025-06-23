import React, { useState, useEffect, useRef } from "react";

interface AppConfigurationModalProps {
  onClose: () => void;
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

const countryLanguageMap: Record<string, string> = {
  USA: "English",
  Canada: "English",
  "United Kingdom": "English",
  Australia: "English",
  "New Zealand": "English",
  France: "French",
  Germany: "German",
  Poland: "Polish",
  Italy: "Italian",
  Austria: "German",
  Sweden: "Swedish",
  Norway: "Norwegian",
  Denmark: "Danish",
  "": "English", // fallback
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

const AppConfigurationModal: React.FC<AppConfigurationModalProps> = ({
  onClose,
}) => {
  const [countryOfUse, setCountryOfUse] = useState("USA");
  const [countryOfPurchase, setCountryOfPurchase] = useState("USA");
  const [language, setLanguage] = useState("English");
  const [designStandard, setDesignStandard] = useState("NDS 2018");

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle outside click
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

  // Update settings when country changes
  useEffect(() => {
    const lang = countryLanguageMap[countryOfUse] || "English";
    setLanguage(lang);

    if (countryOfUse === "USA") {
      setDesignStandard("NDS 2018");
      setCountryOfPurchase("USA");
    } else if (countryOfUse === "Canada") {
      setDesignStandard("CSA 086:19");
      setCountryOfPurchase("Canada");
    } else if (euCountries.includes(countryOfUse)) {
      setDesignStandard("EN 1995-1-1");
      setCountryOfPurchase(countryOfUse);
    } else {
      setDesignStandard("-");
      setCountryOfPurchase(countryOfUse);
    }
  }, [countryOfUse]);

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
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">App Configuration</h2>

        <div className="grid grid-cols-5 gap-4 items-center text-sm">
          {/* Country of Use */}
          <label htmlFor="useCountry" className="col-span-1 font-medium">
            Country of Use
          </label>
          <select
            id="useCountry"
            value={countryOfUse}
            onChange={(e) => setCountryOfUse(e.target.value)}
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full"
          >
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Country of Purchase */}
          <label htmlFor="purchaseCountry" className="col-span-1 font-medium">
            Country of Purchase
          </label>
          <select
            id="purchaseCountry"
            value={countryOfPurchase}
            onChange={(e) => setCountryOfPurchase(e.target.value)}
            disabled={countryOfUse === "USA" || countryOfUse === "Canada"}
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full disabled:bg-gray-100 disabled:text-gray-500"
          >
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Language */}
          <label htmlFor="language" className="col-span-1 font-medium">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full"
          >
            {Object.values(countryLanguageMap)
              .filter((v, i, a) => a.indexOf(v) === i) // unique
              .map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
          </select>

          {/* Design Standard */}
          <label className="col-span-1 font-medium">Design Standard</label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value={designStandard}
            disabled
          />

          {/* Design Method */}
          <label className="col-span-1 font-medium">Design Method</label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value="Limit States Design (LSD)"
            disabled
          />

          {/* Unit */}
          <label className="col-span-1 font-medium">Unit</label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value="Metric"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default AppConfigurationModal;
