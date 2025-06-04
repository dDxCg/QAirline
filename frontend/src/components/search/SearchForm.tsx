import React, { useState } from 'react';
import PassengerSelector from '../common/PassengerSelector';
import Button from '../common/Button';
import Input from '../common/Input';
import { twMerge } from 'tailwind-merge';

type TripType = 'round-trip' | 'one-way';

interface SearchFormData {
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: {
    adults: number;
    children: number;
  };
}

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    tripType: 'round-trip',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: {
      adults: 1,
      children: 0,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search data:', formData);
  };

  const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        'flex-1 py-2.5 text-sm font-medium transition-colors duration-200',
        active
          ? 'border-b-2 border-primary-600 text-primary-600'
          : 'text-gray-500 hover:text-gray-700'
      )}
    >
      {children}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trip Type Tabs */}
      <div className="flex border-b border-gray-200">
        <TabButton
          active={formData.tripType === 'round-trip'}
          onClick={() => setFormData(prev => ({ ...prev, tripType: 'round-trip' }))}
        >
          Round Trip
        </TabButton>
        <TabButton
          active={formData.tripType === 'one-way'}
          onClick={() => setFormData(prev => ({ ...prev, tripType: 'one-way' }))}
        >
          One Way
        </TabButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <Input
            type="text"
            value={formData.from}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, from: e.target.value }))
            }
            placeholder="Select departure"
          />
        </div>

        {/* To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <Input
            type="text"
            value={formData.to}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, to: e.target.value }))
            }
            placeholder="Select destination"
          />
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departure
          </label>
          <Input
            type="date"
            value={formData.departureDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, departureDate: e.target.value }))
            }
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Return Date - Only show for round-trip */}
        {formData.tripType === 'round-trip' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return
            </label>
            <Input
              type="date"
              value={formData.returnDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, returnDate: e.target.value }))
              }
              min={formData.departureDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        )}

        {/* Passenger Selector */}
        <div className={formData.tripType === 'one-way' ? 'md:col-span-2 lg:col-span-1' : ''}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passengers
          </label>
          <PassengerSelector
            value={formData.passengers}
            onChange={(newValue) =>
              setFormData((prev) => ({
                ...prev,
                passengers: newValue,
              }))
            }
          />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full md:w-auto">
          Search Flights
        </Button>
      </div>
    </form>
  );
};

export default SearchForm; 