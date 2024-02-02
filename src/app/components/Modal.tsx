import React, { ReactNode } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { ImHappy2 } from 'react-icons/im';

interface BodyModalType {
  keyword: string;
  message: string;
  icon: ReactNode;
}

interface ModalProps {
  title: string;
  message?: string;
  chord?: string;
  buttonText?: string;
  variant: 'home' | 'playground' | 'help' | 'settings';
  bodyModal?: BodyModalType[];
  onClose: () => void;
  onGoToPlayground?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  variant,
  title,
  message,
  bodyModal,
  chord,
  buttonText,
  onClose,
  onGoToPlayground,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-950/35 bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-[#231C24] text-white p-8 rounded-md shadow-lg text-center relative ${
          variant === 'help' && 'w-1/3'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute -top-6 -right-6 p-2 rounded-full">
          <IoCloseCircleSharp
            size={40}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex items-center justify-center mb-3 text-2xl">
          <h2 className="font-bold">{title}</h2>
          {variant === 'playground' && (
            <ImHappy2 className="ml-2.5 text-yellow-400 " />
          )}
        </div>
        {variant === 'home' && (
          <p className="text-gray-300">
            {message} <span className="text-primary font-bold">{chord}</span>
          </p>
        )}
        {variant === 'help' &&
          bodyModal.map((item, index) => (
            <div key={index} className="flex flex-col text-gray-300 gap-3">
              <div className="flex justify-center items-center font-bold text-white gap-2.5">
                <div className="bg-primary rounded-full p-1.5 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-primary text-4xl">{item.keyword}</h3>
              </div>
              <p className="font-light mb-3.5">{item.message}</p>
            </div>
          ))}
        {buttonText && (
          <button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-all duration-300 mt-4"
            onClick={onGoToPlayground ?? onClose}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
