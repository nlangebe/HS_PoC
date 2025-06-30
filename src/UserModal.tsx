import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface UserModalProps {
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>

        <div className="flex flex-col items-center space-y-4">
          <img
            src="/Images/User.png"
            alt="User profile"
            className="w-24 h-24 rounded-full border border-gray-300"
          />
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">
              designer@customercompany.com
            </p>
            <p className="text-sm text-gray-500">Role: Design Engineer</p>
            <p className="text-sm text-gray-500">Team: Design Engineering</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
