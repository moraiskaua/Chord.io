import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  buttonText,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#231C24] text-white p-8 rounded-md shadow-lg text-center"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-gray-300 mb-4">{message}</p>
        <button
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-all duration-300"
          onClick={onClose}
        >
          {buttonText ?? 'Close'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
