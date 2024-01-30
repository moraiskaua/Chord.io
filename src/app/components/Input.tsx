'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

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
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={`outline-none form-input block w-full rounded-md p-1.5 bg-[#251926] shadow-sm ring-1 ring-inset ring-primary text-white sm:text-sm sm:leading-6 
          ${errors[id] && 'focus:ring-[#FB037A]'} ${
            disabled && 'opacity-50 cursor-default'
          }`}
        />
      </div>
    </div>
  );
};

export default Input;
