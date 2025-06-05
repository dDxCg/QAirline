import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface RadioOption {
  value: string | number;
  label: string;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  options: RadioOption[];
  label?: string;
  error?: string;
  helperText?: string;
  direction?: 'horizontal' | 'vertical';
}

const Radio: React.FC<RadioProps> = ({
  options,
  label,
  error,
  helperText,
  direction = 'vertical',
  className,
  disabled,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className={twMerge(
          'space-y-2',
          direction === 'horizontal' && 'space-y-0 space-x-6 flex items-center',
          className
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              disabled={disabled}
              className={twMerge(
                'h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500',
                disabled && 'cursor-not-allowed opacity-50',
                error && 'border-red-500'
              )}
              {...props}
            />
            <label
              className={twMerge(
                'ml-2 text-sm font-medium',
                disabled ? 'text-gray-400' : 'text-gray-700',
                error && 'text-red-500'
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Radio; 