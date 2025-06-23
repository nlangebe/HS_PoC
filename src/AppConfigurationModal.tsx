import React, { useState, useEffect } from "react";

interface AppConfigurationModalProps {
  onClose: () => void;
}

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
  "": "English", // Fallback
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
  const [country, setCountry] = useState("USA");
  const [language, setLanguage] = useState("English");
  const [designStandard, setDesignStandard] = useState("NDS 2018");

  // Update language and design standard when country changes
  useEffect(() => {
    const lang = countryLanguageMap[country] || "English";
    setLanguage(lang);

    if (country === "USA") {
      setDesignStandard("NDS 2018");
    } else if (country === "Canada") {
      setDesignStandard("CSA 086:19");
    } else if (euCountries.includes(country)) {
      setDesignStandard("EN 1995-1-1");
    } else {
      setDesignStandard("-");
    }
  }, [country]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">App Configuration</h2>

        <div className="grid grid-cols-5 gap-4 items-center text-sm">
          {/* Country */}
          <label htmlFor="country" className="col-span-1 font-medium">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option>USA</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Norway</option>
            <option>Poland</option>
            <option>Germany</option>
            <option>Denmark</option>
            <option>France</option>
            <option>Austria</option>
            <option>New Zealand</option>
            <option>Sweden</option>
            <option>Italy</option>
            <option>Australia</option>
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
              .filter((v, i, a) => a.indexOf(v) === i) // unique languages
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

          {/* Design Method (Static) */}
          <label className="col-span-1 font-medium">Design Method</label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value="Limit States Design (LSD)"
            disabled
          />

          {/* Unit (Static) */}
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
