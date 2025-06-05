import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface PassengerCount {
  adults: number;
  children: number;
}

interface PassengerSelectorProps {
  value: PassengerCount;
  onChange: (value: PassengerCount) => void;
  className?: string;
  placeholder?: string;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({
  value,
  onChange,
  className,
  placeholder = 'Select passengers'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updatePassengers = (type: 'adults' | 'children', increment: boolean) => {
    const newValue = { ...value };
    if (increment) {
      if (type === 'adults' && newValue.adults < 9) {
        newValue.adults += 1;
      } else if (type === 'children' && newValue.children < 9) {
        newValue.children += 1;
      }
    } else {
      if (type === 'adults' && newValue.adults > 1) {
        newValue.adults -= 1;
      } else if (type === 'children' && newValue.children > 0) {
        newValue.children -= 1;
      }
    }
    onChange(newValue);
  };

  const getDisplayText = () => {
    const total = value.adults + value.children;
    if (total === 0) return placeholder;

    const parts = [];
    if (value.adults > 0) {
      parts.push(`${value.adults} Adult${value.adults !== 1 ? 's' : ''}`);
    }
    if (value.children > 0) {
      parts.push(`${value.children} Child${value.children !== 1 ? 'ren' : ''}`);
    }
    return parts.join(' • ');
  };

  const renderCounterButton = (
    onClick: () => void,
    icon: string,
    disabled: boolean
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        'w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200',
        'border border-gray-300 hover:border-primary-500 hover:bg-primary-50',
        'text-gray-700 hover:text-primary-600 active:scale-95',
        disabled && 'opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-transparent hover:text-gray-700'
      )}
      disabled={disabled}
    >
      {icon}
    </button>
  );

  return (
    <div className="relative" ref={popupRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          'w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg',
          'transition-all duration-200 ease-in-out',
          'hover:border-primary-500 hover:shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-0.5">Passengers</span>
            <span className="text-gray-900 font-medium">{getDisplayText()}</span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 transform transition-all duration-200 ease-out">
          <div className="p-4 space-y-6">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Adults</div>
                <div className="text-sm text-gray-500">Age 12+</div>
              </div>
              <div className="flex items-center space-x-4">
                {renderCounterButton(
                  () => updatePassengers('adults', false),
                  '−',
                  value.adults <= 1
                )}
                <span className="w-6 text-center font-medium text-gray-900">
                  {value.adults}
                </span>
                {renderCounterButton(
                  () => updatePassengers('adults', true),
                  '+',
                  value.adults >= 9
                )}
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Children</div>
                <div className="text-sm text-gray-500">Age 2-11</div>
              </div>
              <div className="flex items-center space-x-4">
                {renderCounterButton(
                  () => updatePassengers('children', false),
                  '−',
                  value.children <= 0
                )}
                <span className="w-6 text-center font-medium text-gray-900">
                  {value.children}
                </span>
                {renderCounterButton(
                  () => updatePassengers('children', true),
                  '+',
                  value.children >= 9
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                className="w-full justify-center font-medium"
                onClick={() => setIsOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerSelector; 