// src/components/Modal.jsx
import React from 'react';

/**
 * @param {{ isOpen: boolean, onClose: () => void, children: React.ReactNode }} props
 */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-300 hover:text-white">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;