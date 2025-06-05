import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  size = 'md',
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'w-full rounded-lg border bg-white text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const selectStyles = twMerge(
    baseStyles,
    sizes[size],
    error ? 'border-red-500' : 'border-gray-300',
    disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          disabled={disabled}
          className={selectStyles}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Select; 