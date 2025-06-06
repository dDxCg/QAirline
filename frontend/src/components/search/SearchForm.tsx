import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import flightServices from "@/services/flightServices";

interface SearchFormData {
  origin: string;
  destination: string;
  departureTime: string;
}

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    origin: "",
    destination: "",
    departureTime: "",
  });
  const [tripType, setTripType] = useState<"round-trip" | "one-way">();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    if (tripType) {
      sessionStorage.setItem("tripType", tripType);
    }
    flightServices
      .searchFlights(formData)
      .then(() => {
        // Handle successful search results
      })
      .catch((error) => {
        console.error("Error searching flights:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <Input
            type="text"
            value={formData.origin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, origin: e.target.value }))
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
            value={formData.destination}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, destination: e.target.value }))
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
            value={formData.departureTime}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                departureTime: e.target.value,
              }))
            }
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Trip Type Selector */}
        <div className="flex items-end space-x-4">
          <label className="flex items-center whitespace-nowrap">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === "round-trip"}
              onChange={() => {
                setTripType("round-trip");
              }}
              className="mr-2"
            />
            One Way
          </label>
          <label className="flex items-center whitespace-nowrap">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={() => {
                setTripType("one-way");
              }}
              className="mr-2"
            />
            Round Trip
          </label>
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
