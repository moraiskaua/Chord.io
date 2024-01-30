'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  fullWidth: boolean;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  fullWidth,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-3 flex bg-secondary text-white justify-center rounded-md text-sm font-semibold ring-1 ring-inset ring-primary px-3 py-2 ${
        disabled && 'opacity-50 cursor-default'
      } ${fullWidth && 'w-full'}
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
