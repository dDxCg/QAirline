import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

export interface Flight {
  id: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
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
    <Card className="p-4 lg:p-6 hover:shadow-lg transition-shadow duration-200">
      <div>
        {/* Flight Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-4 mb-4 lg:mb-6">
          <div className="flex items-center">
            <span className="text-blue-600 font-semibold text-lg lg:text-xl">{flight.flightNumber}</span>
            <span className="text-gray-500 ml-3 text-sm lg:text-base">{flight.aircraft}</span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-medium text-sm">
            {formattedDate}
          </div>
        </div>

        {/* Flight Details */}
        <div className="grid grid-cols-12 items-center gap-4 lg:gap-8">
          {/* Departure */}
          <div className="col-span-4">
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{flight.departureTime}</div>
            <div className="text-gray-600 text-sm lg:text-base mt-1">
              {flight.departureCity}
            </div>
          </div>

          {/* Flight Path */}
          <div className="col-span-4 flex flex-col items-center justify-center px-2">
            <div className="w-full flex items-center gap-3 mb-1">
              <div className="h-[2px] flex-1 bg-gray-300"></div>
              <svg className="w-6 h-6 text-blue-500 transform -rotate-45" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.64 14.26l2.86.95 4.02-4.02-8-4.59 1.16-1.16c.1-.1.26-.14.41-.1l9.3 2.98c1.58-1.58 3.15-3.2 4.77-4.75.31-.33.7-.58 1.16-.73.45-.16.87-.27 1.25-.34.55-.05.98.4.93.93-.07.38-.18.8-.34 1.25-.15.46-.4.85-.73 1.16l-4.75 4.78 2.97 9.29c.05.15 0 .29-.1.41l-1.17 1.16-4.57-8.02L8.8 17.5l.95 2.84L8.6 21.5l-2.48-3.62L2.5 15.4l1.14-1.14z" />
              </svg>
              <div className="h-[2px] flex-1 bg-gray-300"></div>
            </div>
            <div className="text-gray-500 text-sm font-medium">
              {flight.duration}
            </div>
          </div>

          {/* Arrival */}
          <div className="col-span-4 text-right">
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">{flight.arrivalTime}</div>
            <div className="text-gray-600 text-sm lg:text-base mt-1">
              {flight.arrivalCity}
            </div>
          </div>
        </div>

        {/* Bottom Section: Amenities and Action */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          {/* Flight Amenities */}
          <div className="flex flex-wrap gap-4 lg:gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">Wi-Fi</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
              </svg>
              <span className="text-sm">Power Outlets</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Entertainment</span>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className="min-w-[140px] py-2.5"
            onClick={() => onSelect(flight.id)}
          >
            Select Flight
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FlightCard; 