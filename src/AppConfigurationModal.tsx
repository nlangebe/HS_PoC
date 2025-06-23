import React from "react";

interface AppConfigurationModalProps {
  onClose: () => void;
}

const AppConfigurationModal: React.FC<AppConfigurationModalProps> = ({
  onClose,
}) => {
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

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">App Configuration</h2>

        {/* Grid layout for settings */}
        <div className="grid grid-cols-5 gap-4 items-center text-sm">
          {/* Country */}
          <label htmlFor="country" className="col-span-1 font-medium">
            Country
          </label>
          <select
            id="country"
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
          </select>

          {/* Language */}
          <label htmlFor="language" className="col-span-1 font-medium">
            Language
          </label>
          <select
            id="language"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option>English</option>
            <option>French</option>
            <option>German</option>
            <option>Spanish</option>
            <option>Italian</option>
            <option>Dutch</option>
            <option>Polish</option>
            <option>Portuguese</option>
            <option>Czech</option>
            <option>Romanian</option>
          </select>

          {/* Design Standard (disabled) */}
          <label className="col-span-1 font-medium">Design Standard</label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value="EN 1995-1-1"
            disabled
          />

          {/* Design Method (disabled) */}
          <label className="col-span-1 font-medium">Design Method</label>
          <input
            type="text"
            className="col-span-4 border border-gray-300 rounded px-2 py-1 w-full text-gray-500 bg-gray-100"
            value="Limit States Design (LSD)"
            disabled
          />

          {/* Unit (disabled) */}
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
