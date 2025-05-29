import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  className,
  disabled,
  ...props
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          disabled={disabled}
          className={twMerge(
            'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
            disabled && 'cursor-not-allowed opacity-50',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
      </div>
      <div className="ml-3">
        {label && (
          <label
            className={twMerge(
              'text-sm font-medium',
              disabled ? 'text-gray-400' : 'text-gray-700',
              error && 'text-red-500'
            )}
          >
            {label}
          </label>
        )}
        {error ? (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Checkbox; 