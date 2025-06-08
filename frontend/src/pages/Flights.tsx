import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import SearchForm from "../components/search/SearchForm";
import Card from "../components/common/Card";
import FlightCard from "../components/flight/FlightCard";
import type { Flight } from "../components/flight/FlightCard";
import Button from "../components/common/Button";
import { useSearchParams } from "react-router-dom";
import flightServices from "@/services/flightServices";

interface FilterState {
  priceRange: string[];
  departureTime: string[];
  class: string[];
}

const Flights: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [],
    departureTime: [],
    class: [],
  });

  // Mock data - replace with actual API call
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const origin = params.get("origin") || "";
        const destination = params.get("destination") || "";
        const departureTime = params.get("departureTime") || "";
        let flightData: Flight[] = [];
        if (!origin && !destination && !departureTime) {
          flightData = await flightServices.getAllFlights();
        } else {
          const searchData = { origin, destination, departureTime };
          flightData = await flightServices.searchFlights(searchData);
        }
        // setFlights(flightData);
        // Current date/time
        const now = new Date();

        // Parse "DD/MM/YYYY - HH:mm" string to Date
        const parseDepartureTime = (str: string) => {
          const [datePart, timePart] = str.split(" - ");
          const [day, month, year] = datePart.split("/").map(Number);
          const [hour, minute] = timePart.split(":").map(Number);
          return new Date(year, month - 1, day, hour, minute);
        };

        // Filter flights where departure_time >= now
        const filteredFlights = flightData.filter((flight) => {
          const departureDate = parseDepartureTime(flight.departure_time);
          return departureDate >= now;
        });

        setFlights(filteredFlights);
        console.log("Fetched flights:", filteredFlights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, [location.search]);

  const filterOptions = {
    departureTime: [
      { id: "morning", label: "Morning (6AM - 12PM)" },
      { id: "afternoon", label: "Afternoon (12PM - 6PM)" },
      { id: "evening", label: "Evening (6PM - 12AM)" },
    ],
  };

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentFilters = prev[category];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((item) => item !== value)
        : [...currentFilters, value];

      return {
        ...prev,
        [category]: newFilters,
      };
    });
  };

  const filterFlights = (flights: Flight[]) => {
    return flights.filter((flight) => {
      // Departure Time Filter
      const [departureDate, departureTime] = flight.departure_time.split(" - ");
      if (filters.departureTime.length > 0) {
        const hour = parseInt(departureTime.split(":")[0]);
        const matchesTime = filters.departureTime.some((time) => {
          if (time === "morning") return hour >= 6 && hour < 12;
          if (time === "afternoon") return hour >= 12 && hour < 18;
          if (time === "evening") return hour >= 18 || hour < 6;
          return false;
        });
        if (!matchesTime) return false;
      }

      return true;
    });
  };

  const handleSelectFlight = (flightId: string) => {
    const selectedFlight = flights.find(
      (flight) => flight.flight_uuid === flightId
    );
    if (selectedFlight) {
      navigate("/booking-details", {
        state: { flightDetails: selectedFlight },
      });
    }
  };

  const handleViewDetails = (flightId: string) => {
    // TODO: Implement view details logic
    console.log("Viewing details for flight:", flightId);
  };

  // Filter and sort flights before rendering
  const filteredAndSortedFlights = filterFlights(flights);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Container>
          {/* Search Section */}
          <div className="py-4 sm:py-8">
            <SearchForm />
          </div>

          <div className="pb-8 sm:pb-12 flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Button
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Filter Column */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block w-full lg:w-72 lg:flex-shrink-0`}
            >
              <Card className="p-4 lg:p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Filter Results
                </h2>

                {/* Departure Time */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Departure Time
                  </h3>
                  <div className="space-y-2">
                    {filterOptions.departureTime.map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          checked={filters.departureTime.includes(option.id)}
                          onChange={() =>
                            handleFilterChange("departureTime", option.id)
                          }
                        />
                        <span className="ml-2 text-sm sm:text-base text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="flex-1 max-w-3xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Available Flights
                </h2>
                {/* <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none border border-gray-300 rounded-md px-3 py-1.5 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="duration">Duration</option>
                    <option value="departure">Departure Time</option>
                  </select>
                </div> */}
              </div>

              {/* Flight Cards */}
              <div className="space-y-4">
                {filteredAndSortedFlights.map((flight) => (
                  <FlightCard
                    key={flight.flight_uuid}
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
