import React from "react";
import {
  Download,
  Upload,
  RefreshCw,
  Printer,
  Info,
  Settings,
  MessageCircle,
  PlayCircle,
} from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-4">
      {/* Left: Logo + Button group */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img
          src="https://www.simpson.fr/themes/custom/sst/logo.svg"
          alt="Simpson Strong-Tie Logo"
          className="h-8 w-auto"
        />

        {/* Buttons aligned right next to logo */}
        <div className="flex items-center space-x-2 text-xs text-gray-700">
          <HeaderButton icon={<Download size={16} />} label="Download" />
          <HeaderButton icon={<Upload size={16} />} label="Upload" />
          <HeaderButton icon={<RefreshCw size={16} />} label="Reset" />
          <HeaderButton icon={<Printer size={16} />} label="Print" />
          <HeaderButton icon={<Info size={16} />} label="About" />
          <HeaderButton icon={<Settings size={16} />} label="Settings" />
          <HeaderButton icon={<MessageCircle size={16} />} label="Feedback" />
          <HeaderButton icon={<PlayCircle size={16} />} label="Tutorials" />
        </div>
      </div>

      {/* Right: HSI and image */}
      <div className="flex items-center space-x-2">
        <span className="text-orange-600 font-bold text-2xl tracking-wide">
          HSI
        </span>
        <img
          src="https://ssttoolbox.widen.net/content/2rtdaklh1x/jpeg/Soft_HS_ProdPho_Ill_Soft_HangerSelector-Icon_C0.jpeg?w=250&h=250&position=c&color=ffffffff&quality=40&retina=true&u=cjmyin"
          alt="Wood Connector"
          className="h-10 w-auto object-contain"
        />
      </div>
    </header>
  );
};

interface HeaderButtonProps {
  icon: React.ReactNode;
  label: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, label }) => (
  <button
    className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
    title={label}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Header;
