import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

export interface Flight {
  id: string;
  flightNumber: string;
  departureCity: string;
  departureCode: string;
  arrivalCity: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  aircraft: string;
  date: string;
  price: number;
  class: string;
}

interface FlightCardProps {
  flight: Flight;
  onSelect: (flightId: string) => void;
  onViewDetails: (flightId: string) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect, onViewDetails }) => {
  // Format the date to be more compact
  const formattedDate = new Date(flight.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card className="p-4 lg:p-6">
      <div>
        {/* Flight Header */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-4 lg:mb-6">
          <div className="flex items-center flex-1">
            <span className="text-blue-600 font-medium text-lg">{flight.flightNumber}</span>
            <span className="text-gray-500 ml-3 text-sm lg:text-base">{flight.aircraft}</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-medium text-sm">
            {formattedDate}
          </div>
        </div>

        {/* Flight Details */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Departure */}
          <div className="flex-1">
            <div className="text-xl lg:text-2xl font-bold">{flight.departureTime}</div>
            <div className="text-gray-600 text-sm lg:text-base">{flight.departureCity}</div>
          </div>

          {/* Flight Path */}
          <div className="flex-1 max-w-[150px] flex items-center gap-2">
            <div className="h-[2px] flex-1 bg-gray-300 relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.64 14.26l2.86.95 4.02-4.02-8-4.59 1.16-1.16c.1-.1.26-.14.41-.1l9.3 2.98c1.58-1.58 3.15-3.2 4.77-4.75.31-.33.7-.58 1.16-.73.45-.16.87-.27 1.25-.34.55-.05.98.4.93.93-.07.38-.18.8-.34 1.25-.15.46-.4.85-.73 1.16l-4.75 4.78 2.97 9.29c.05.15 0 .29-.1.41l-1.17 1.16-4.57-8.02L8.8 17.5l.95 2.84L8.6 21.5l-2.48-3.62L2.5 15.4l1.14-1.14z" />
                </svg>
              </div>
            </div>
            <div className="text-gray-500 text-xs lg:text-sm whitespace-nowrap">
              {flight.duration}
            </div>
          </div>

          {/* Arrival */}
          <div className="flex-1 text-right">
            <div className="text-xl lg:text-2xl font-bold">{flight.arrivalTime}</div>
            <div className="text-gray-600 text-sm lg:text-base">{flight.arrivalCity}</div>
          </div>

          {/* Actions */}
          <div className="ml-4 lg:ml-8">
            <Button className="whitespace-nowrap" onClick={() => onSelect(flight.id)}>
              Select Flight
            </Button>
          </div>
        </div>

        {/* Flight Amenities */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3 lg:gap-4">
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs lg:text-sm">Wi-Fi</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
              </svg>
              <span className="text-xs lg:text-sm">Power Outlets</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xs lg:text-sm">Entertainment</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FlightCard; 