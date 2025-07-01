import React from "react";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  country: string;
  onOpenConfig: () => void;
  onOpenUserModal: () => void;
}

const countries = {
  USA: "https://flagcdn.com/us.svg",
  Canada: "https://flagcdn.com/ca.svg",
  "United Kingdom": "https://flagcdn.com/gb.svg",
  Norway: "https://flagcdn.com/no.svg",
  Poland: "https://flagcdn.com/pl.svg",
  Germany: "https://flagcdn.com/de.svg",
  Denmark: "https://flagcdn.com/dk.svg",
  France: "https://flagcdn.com/fr.svg",
  Austria: "https://flagcdn.com/at.svg",
  "New Zealand": "https://flagcdn.com/nz.svg",
  Sweden: "https://flagcdn.com/se.svg",
  Italy: "https://flagcdn.com/it.svg",
  Australia: "https://flagcdn.com/au.svg",
};

const langAcronyms: Record<string, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  pl: "PL",
  it: "IT",
  sv: "SV",
  no: "NO",
  da: "DA",
};

const Header: React.FC<HeaderProps> = ({
  country,
  onOpenConfig,
  onOpenUserModal,
}) => {
  const { i18n, t } = useTranslation();
  const flagUrl = countries[country] || countries["USA"];
  const currentLang = i18n.language || "en";
  const langAcronym = langAcronyms[currentLang] || "EN";

  return (
    <header className="h-12 bg-[#f4f4f4] border-b border-gray-300 flex items-center justify-between px-4 text-sm">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        <img
          src="/Images/logo.svg"
          alt="Simpson Strong-Tie Logo"
          className="h-6 w-auto"
        />
        <nav className="flex items-center space-x-4 text-gray-600">
          <button className="hover:underline hover:text-[#5b3a00] font-semibold transition duration-200">
            File
          </button>
          <button className="hover:underline hover:text-[#5b3a00] font-semibold transition duration-200">
            About
          </button>
          <button className="hover:underline hover:text-[#5b3a00] font-semibold transition duration-200">
            Reset
          </button>
          <button className="hover:underline hover:text-[#5b3a00] font-semibold transition duration-200">
            Help Center
          </button>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenConfig}
          className="border border-gray-400 rounded px-3 py-[2px] text-xs sm:text-sm text-black flex items-center space-x-2 font-semibold hover:bg-gray-200 transition"
        >
          <span>Country:</span>
          <img
            src={flagUrl}
            alt={`${country} flag`}
            className="h-4 w-6 object-cover"
          />
          <span>| Language: {langAcronym}</span>
        </button>

        <span className="text-gray-400 mx-2 select-none">|</span>

        <button
          onClick={onOpenUserModal}
          title="User Profile"
          aria-label="User Profile"
          className="rounded-full overflow-hidden w-8 h-8 border-2 border-gray-300 hover:border-[#5b3a00] transition"
        >
          <img
            src="/Images/User.png"
            alt="User"
            className="object-cover w-full h-full"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
