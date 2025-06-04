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
  price: number;
  class: 'Economy' | 'Premium Economy' | 'Business';
}

interface FlightCardProps {
  flight: Flight;
  onSelect: (flightId: string) => void;
  onViewDetails: (flightId: string) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect, onViewDetails }) => {
  const getClassBadgeColor = (flightClass: string) => {
    switch (flightClass) {
      case 'Economy':
        return 'bg-blue-500';
      case 'Premium Economy':
        return 'bg-blue-600';
      case 'Business':
        return 'bg-blue-700';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Flight Header */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-600 font-medium">{flight.flightNumber}</span>
            <span className="text-gray-500">{flight.aircraft}</span>
          </div>

          {/* Flight Details */}
          <div className="flex items-center gap-8">
            {/* Departure */}
            <div>
              <div className="text-2xl font-bold">{flight.departureTime}</div>
              <div className="text-gray-600">{flight.departureCode}</div>
              <div className="text-sm text-gray-500">{flight.departureCity}</div>
            </div>

            {/* Flight Path */}
            <div className="flex-1 flex items-center gap-2">
              <div className="h-[2px] flex-1 bg-gray-300 relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.64 14.26l2.86.95 4.02-4.02-8-4.59 1.16-1.16c.1-.1.26-.14.41-.1l9.3 2.98c1.58-1.58 3.15-3.2 4.77-4.75.31-.33.7-.58 1.16-.73.45-.16.87-.27 1.25-.34.55-.05.98.4.93.93-.07.38-.18.8-.34 1.25-.15.46-.4.85-.73 1.16l-4.75 4.78 2.97 9.29c.05.15 0 .29-.1.41l-1.17 1.16-4.57-8.02L8.8 17.5l.95 2.84L8.6 21.5l-2.48-3.62L2.5 15.4l1.14-1.14z" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-500 text-sm whitespace-nowrap">
                {flight.duration}
              </div>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <div className="text-2xl font-bold">{flight.arrivalTime}</div>
              <div className="text-gray-600">{flight.arrivalCode}</div>
              <div className="text-sm text-gray-500">{flight.arrivalCity}</div>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="ml-8 flex flex-col items-end gap-4">
          <div>
            <span className={`px-3 py-1 rounded-full text-white text-sm ${getClassBadgeColor(flight.class)}`}>
              {flight.class}
            </span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">${flight.price}</div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onViewDetails(flight.id)}>
              View Details
            </Button>
            <Button onClick={() => onSelect(flight.id)}>
              Select Flight
            </Button>
          </div>
        </div>
      </div>

      {/* Flight Amenities */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Wi-Fi</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
            <span>Power Outlets</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Entertainment</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FlightCard; 