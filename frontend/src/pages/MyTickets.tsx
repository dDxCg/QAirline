import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import BookingCard from "../components/booking/BookingCard";
import type { Booking } from "../components/booking/BookingCard";

const MyTickets: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API call
  const bookings: Booking[] = [
    {
      id: "1",
      flightNumber: "QA101",
      status: "Confirmed",
      bookingNumber: "QA-2024-001",
      departureCity: "New York",
      departureCode: "NYC",
      arrivalCity: "London",
      arrivalCode: "LON",
      departureTime: "08:30",
      departureDate: "Dec 15, 2024",
      arrivalTime: "20:45",
      arrivalDate: "Dec 15, 2024",
      seatNumber: "12A",
      class: "Economy",
      price: 713,
      type: "one-way",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <Container>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              My Bookings
            </h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search Bar */}
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search ticket ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Filter Panel - Hidden by default on mobile */}
          {showFilters && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 p-2">
                    <option>All Classes</option>
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 p-2">
                    <option>All Statuses</option>
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 p-2">
                    <option>All Types</option>
                    <option>One-way</option>
                    <option>Round-trip</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 p-2">
                    <option>All Time</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          {/* <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "upcoming"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Upcoming Flights
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "past"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Past Flights
                </button>
              </nav>
            </div>
          </div> */}

          {/* Booking Cards */}
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default MyTickets;
