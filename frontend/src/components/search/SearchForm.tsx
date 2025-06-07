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
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("one-way");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="w-full max-w-[95%] sm:max-w-none mx-auto">
      <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-white/30 p-3 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg border border-white/30">
        {/* Trip Type Selector */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            type="button"
            onClick={() => setTripType("one-way")}
            className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              tripType === "one-way"
                ? "bg-blue-600/90 text-white shadow-lg"
                : "bg-white/50 text-gray-700 hover:bg-white/70"
            }`}
          >
            One-way
          </button>
          <button
            type="button"
            onClick={() => setTripType("round-trip")}
            className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              tripType === "round-trip"
                ? "bg-blue-600/90 text-white shadow-lg"
                : "bg-white/50 text-gray-700 hover:bg-white/70"
            }`}
          >
            Round-trip
          </button>
        </div>

        {/* Search Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-2 sm:gap-3">
          {/* From */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-gray-500 z-10">
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <Input
              type="text"
              value={formData.origin}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, origin: e.target.value }))
              }
              placeholder="From"
              className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base rounded-xl bg-white/50 border-white/30 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700 placeholder-gray-500 w-full"
            />
          </div>

          {/* To */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-gray-500 z-10">
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <Input
              type="text"
              value={formData.destination}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, destination: e.target.value }))
              }
              placeholder="To"
              className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base rounded-xl bg-white/50 border-white/30 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700 placeholder-gray-500 w-full"
            />
          </div>

          {/* Departure Date */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-gray-500 z-10">
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
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
              className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base rounded-xl bg-white/50 border-white/30 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700 w-full"
            />
          </div>

          {/* Search Button */}
          <Button 
            type="submit" 
            className="w-full h-10 sm:h-12 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/90 transition-colors duration-200 shadow-lg"
          >
            <span className="flex items-center justify-center text-sm sm:text-base">
              Search
              <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
