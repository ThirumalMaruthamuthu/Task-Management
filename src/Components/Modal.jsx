import React from "react";

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 relative max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
