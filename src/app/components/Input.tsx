'use client';

import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  disabled,
  errors,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div
        className={`flex justify-center items-center mt-2 outline-none form-input w-full rounded-md p-1.5 bg-[#251926] shadow-sm ring-1 ring-inset ring-primary text-white sm:text-sm sm:leading-6 
          ${errors[id] && 'focus:ring-[#FB037A]'} ${
          disabled && 'opacity-50 cursor-default'
        }`}
      >
        <input
          id={id}
          type={showPassword ? 'text' : type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={`w-full bg-transparent outline-none`}
        />
        {type === 'password' && (
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <IoMdEyeOff className="text-2xl text-primary cursor-pointer" />
            ) : (
              <IoMdEye className="text-2xl text-primary cursor-pointer" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
