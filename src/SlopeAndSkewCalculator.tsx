import React, { useRef, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCalculate: () => void;
}

const SlopeAndSkewCalculator: React.FC<Props> = ({
  isOpen,
  onClose,
  onCalculate,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-[50vw] p-6 relative flex flex-col"
      >
        {/* Title Top-Left */}
        <h2 className="absolute top-4 left-6 text-xl font-semibold text-gray-800">
          Slope &amp; Skew Calculator
        </h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>

        {/* Image Centered */}
        <div className="flex items-center justify-center my-12">
          <img
            src="/Images/Sketch.png"
            alt="Sketch"
            className="max-w-full object-contain transform scale-110"
          />
        </div>

        {/* Action Buttons Bottom-Right */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onCalculate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Calculation
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlopeAndSkewCalculator;
