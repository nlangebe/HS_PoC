import React from "react";
import { Settings, Grid } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="h-12 bg-[#f4f4f4] border-b border-gray-300 flex items-center justify-between px-4 text-sm">
      {/* LEFT: Logo + Menu */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img
          src="/Images/logo.svg"
          alt="Simpson Strong-Tie Logo"
          className="h-6 w-auto"
        />

        {/* Menu Items */}
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

      {/* RIGHT: Location + Icons */}
      <div className="flex items-center space-x-3">
        {/* Country & Language Box */}
        <div className="border border-gray-400 rounded px-3 py-[2px] text-xs sm:text-sm text-black flex items-center space-x-2 font-semibold">
          <span>Country:</span>
          <img
            src="https://flagcdn.com/us.svg"
            alt="US"
            className="h-4 w-6 object-cover"
          />
          <span>| Language: EN</span>
        </div>

        {/* Settings icon */}
        <button
          title="Settings"
          className="text-gray-800 hover:text-[#5b3a00] transition duration-200"
        >
          <Settings className="w-6 h-6 stroke-2" />
        </button>

        {/* App Grid icon */}
        <button
          title="Apps"
          className="text-gray-800 hover:text-[#5b3a00] transition duration-200"
        >
          <Grid className="w-6 h-6 stroke-2" />
        </button>
      </div>
    </header>
  );
};

export default Header;
