import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Container from '../components/layout/Container';
import SearchForm from '../components/search/SearchForm';
import Card from '../components/common/Card';
import FlightCard from '../components/flight/FlightCard';
import type { Flight } from '../components/flight/FlightCard';
import Button from '../components/common/Button';

interface FilterState {
  priceRange: string[];
  departureTime: string[];
  class: string[];
}

const Flights: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('price-low');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [],
    departureTime: [],
    class: [],
  });
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const flights: Flight[] = [
    {
      id: '1',
      flightNumber: 'QA101',
      departureCity: 'New York',
      departureCode: 'NYC',
      arrivalCity: 'London',
      arrivalCode: 'LON',
      departureTime: '08:30',
      arrivalTime: '20:45',
      duration: '7h 15m',
      aircraft: 'Boeing 787',
      price: 599,
      class: 'Economy',
      date: '2024-03-20'
    },
    {
      id: '2',
      flightNumber: 'QA205',
      departureCity: 'New York',
      departureCode: 'NYC',
      arrivalCity: 'London',
      arrivalCode: 'LON',
      departureTime: '14:20',
      arrivalTime: '02:15',
      duration: '6h 55m',
      aircraft: 'Airbus A350',
      price: 749,
      class: 'Premium Economy',
      date: '2024-03-20'
    },
    {
      id: '3',
      flightNumber: 'QA307',
      departureCity: 'New York',
      departureCode: 'NYC',
      arrivalCity: 'London',
      arrivalCode: 'LON',
      departureTime: '22:10',
      arrivalTime: '09:30',
      duration: '7h 20m',
      aircraft: 'Boeing 777',
      price: 1299,
      class: 'Business',
      date: '2024-03-20'
    },
  ];

  const filterOptions = {
    priceRange: [
      { id: '0-600', label: '$0 - $600' },
      { id: '600-1000', label: '$600 - $1000' },
      { id: '1000+', label: '$1000+' },
    ],
    departureTime: [
      { id: 'morning', label: 'Morning (6AM - 12PM)' },
      { id: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
      { id: 'evening', label: 'Evening (6PM - 12AM)' },
    ],
    class: [
      { id: 'Economy', label: 'Economy' },
      { id: 'Premium Economy', label: 'Premium Economy' },
      { id: 'Business', label: 'Business' },
    ],
  };

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[category];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(item => item !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [category]: newFilters,
      };
    });
  };

  const filterFlights = (flights: Flight[]) => {
    return flights.filter(flight => {
      // Price Range Filter
      if (filters.priceRange.length > 0) {
        const matchesPrice = filters.priceRange.some(range => {
          if (range === '0-600') return flight.price <= 600;
          if (range === '600-1000') return flight.price > 600 && flight.price <= 1000;
          if (range === '1000+') return flight.price > 1000;
          return false;
        });
        if (!matchesPrice) return false;
      }

      // Departure Time Filter
      if (filters.departureTime.length > 0) {
        const hour = parseInt(flight.departureTime.split(':')[0]);
        const matchesTime = filters.departureTime.some(time => {
          if (time === 'morning') return hour >= 6 && hour < 12;
          if (time === 'afternoon') return hour >= 12 && hour < 18;
          if (time === 'evening') return hour >= 18 || hour < 6;
          return false;
        });
        if (!matchesTime) return false;
      }

      // Class Filter
      if (filters.class.length > 0 && !filters.class.includes(flight.class)) {
        return false;
      }

      return true;
    });
  };

  const sortFlights = (flights: Flight[]) => {
    return [...flights].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        default:
          return 0;
      }
    });
  };

  const handleSelectFlight = (flightId: string) => {
    const selectedFlight = flights.find(flight => flight.id === flightId);
    if (selectedFlight) {
      navigate('/booking/passenger-details', {
        state: { flightDetails: selectedFlight }
      });
    }
  };

  const handleViewDetails = (flightId: string) => {
    // TODO: Implement view details logic
    console.log('Viewing details for flight:', flightId);
  };

  const filteredAndSortedFlights = sortFlights(filterFlights(flights));

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Container className="px-3 sm:px-4 lg:px-6">
          {/* Search Section */}
          <div className="py-3 sm:py-4 lg:py-8">
            <SearchForm />
          </div>

          <div className="pb-6 sm:pb-8 lg:pb-12 flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Button
                className="w-full flex items-center justify-center gap-2 text-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            {/* Filter Column */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 lg:flex-shrink-0`}>
              <Card className="p-3 sm:p-4 lg:p-6 lg:sticky lg:top-24">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Filter Results</h2>

                {/* Price Range */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-medium text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Price Range</h3>
                  <div className="space-y-2">
                    {filterOptions.priceRange.map(option => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          checked={filters.priceRange.includes(option.id)}
                          onChange={() => handleFilterChange('priceRange', option.id)}
                        />
                        <span className="ml-2 text-xs sm:text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Departure Time */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-medium text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Departure Time</h3>
                  <div className="space-y-2">
                    {filterOptions.departureTime.map(option => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          checked={filters.departureTime.includes(option.id)}
                          onChange={() => handleFilterChange('departureTime', option.id)}
                        />
                        <span className="ml-2 text-xs sm:text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Class */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-medium text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Class</h3>
                  <div className="space-y-2">
                    {filterOptions.class.map(option => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          checked={filters.class.includes(option.id)}
                          onChange={() => handleFilterChange('class', option.id)}
                        />
                        <span className="ml-2 text-xs sm:text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="flex-1 max-w-3xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Available Flights</h2>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="duration">Duration</option>
                    <option value="departure">Departure Time</option>
                  </select>
                </div>
              </div>

              {/* Flight Cards */}
              <div className="space-y-3 sm:space-y-4">
                {filteredAndSortedFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={handleSelectFlight}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Flights; 