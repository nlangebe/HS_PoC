import React from "react";
import { Settings, User } from "lucide-react";

interface HeaderProps {
  onOpenConfig: () => void;
  onOpenUserModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenConfig, onOpenUserModal }) => {
  return (
    <header className="h-12 bg-[#f4f4f4] border-b border-gray-300 flex items-center justify-between px-4 text-sm">
      {/* LEFT: Logo + Menu */}
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

      {/* RIGHT: Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenConfig}
          className="border border-gray-400 rounded px-3 py-[2px] text-xs sm:text-sm text-black flex items-center space-x-2 font-semibold hover:bg-gray-200 transition"
        >
          <span>Country:</span>
          <img
            src="https://flagcdn.com/us.svg"
            alt="US"
            className="h-4 w-6 object-cover"
          />
          <span>| Language: EN</span>
        </button>

        <button
          title="Settings"
          className="text-gray-800 hover:text-[#5b3a00] transition duration-200"
        >
          <Settings className="w-6 h-6 stroke-2" />
        </button>

        {/* User Icon */}
        <button
          onClick={onOpenUserModal}
          title="User Profile"
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
