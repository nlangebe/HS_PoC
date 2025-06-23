import React from "react";

interface UserModalProps {
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
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
            <p className="text-sm text-gray-500">Desiger@customercompany.com</p>
            <p className="text-sm text-gray-500">Role: Design Engineer</p>
            <p className="text-sm text-gray-500">Team: Design Engineering</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
