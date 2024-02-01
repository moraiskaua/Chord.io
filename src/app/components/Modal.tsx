import React from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { ImHappy2 } from 'react-icons/im';
import { usePathname } from 'next/navigation';

interface ModalProps {
  title: string;
  message: string;
  chord?: string;
  buttonText?: string;
  onClose: () => void;
  onGoToPlayground?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  chord,
  buttonText,
  onClose,
  onGoToPlayground,
}) => {
  const path = usePathname();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#231C24] text-white p-8 rounded-md shadow-lg text-center relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute -top-6 -right-6 p-2 rounded-full">
          <IoCloseCircleSharp
            size={40}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2.5">
          {title}
          {path === '/playground' && <ImHappy2 className="text-yellow-400" />}
        </h2>
        <p className="text-gray-300">
          {message} <span className="text-primary font-bold">{chord}</span>
        </p>
        {buttonText && (
          <button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-all duration-300 mt-4"
            onClick={onGoToPlayground}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
