import React from "react";
import Card from "../common/Card";

export interface Booking {
  id: string;
  flightNumber: string;
  status: "Confirmed" | "Pending" | "Completed";
  bookingNumber: string;
  departureCity: string;
  departureCode: string;
  arrivalCity: string;
  arrivalCode: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  seatNumber: string;
  class: "Economy" | "Premium Economy" | "Business";
  price: number;
  type: "one-way" | "round-trip";
  returnFlight?: {
    flightNumber: string;
    departureTime: string;
    departureDate: string;
    arrivalTime: string;
    arrivalDate: string;
    seatNumber: string;
  };
}

interface BookingCardProps {
  booking: Booking;
  isUpcoming?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isUpcoming = true,
}) => {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
    }
  };

  const FlightRoute: React.FC<{
    departureTime: string;
    departureDate: string;
    departureCity: string;
    arrivalTime: string;
    arrivalDate: string;
    arrivalCity: string;
    flightNumber: string;
    seatNumber: string;
  }> = ({
    departureTime,
    departureDate,
    departureCity,
    arrivalTime,
    arrivalDate,
    arrivalCity,
    flightNumber,
    seatNumber,
  }) => (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 lg:space-x-12">
        <div className="text-center mb-4 sm:mb-0">
          <div className="text-xl lg:text-2xl font-bold text-gray-900">
            {departureTime}
          </div>
          <div className="text-sm text-gray-500">{departureDate}</div>
          <div className="text-base lg:text-lg font-medium text-gray-900 mt-1">
            {departureCity}
          </div>
        </div>

        <div className="flex items-center sm:flex-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 mx-2 lg:mx-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14m-7-7l7 7-7 7"
            />
          </svg>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="text-center mt-4 sm:mt-0">
          <div className="text-xl lg:text-2xl font-bold text-gray-900">
            {arrivalTime}
          </div>
          <div className="text-sm text-gray-500">{arrivalDate}</div>
          <div className="text-base lg:text-lg font-medium text-gray-900 mt-1">
            {arrivalCity}
          </div>
        </div>
      </div>

      <div className="text-center sm:text-right">
        <div className="text-sm text-gray-500">Flight: {flightNumber}</div>
        <div className="text-sm text-gray-500">Seat: {seatNumber}</div>
      </div>
    </div>
  );

  return (
    <Card className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-medium text-primary-600">
            {booking.flightNumber}
          </span>

          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {booking.type === "round-trip" ? "Round-trip" : "One-way"}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          Booking: {booking.bookingNumber}
        </span>
      </div>

      <div className="space-y-6">
        <FlightRoute
          departureTime={booking.departureTime}
          departureDate={booking.departureDate}
          departureCity={booking.departureCity}
          arrivalTime={booking.arrivalTime}
          arrivalDate={booking.arrivalDate}
          arrivalCity={booking.arrivalCity}
          flightNumber={booking.flightNumber}
          seatNumber={booking.seatNumber}
        />

        {booking.type === "round-trip" && booking.returnFlight && (
          <>
            <div className="w-full h-px bg-gray-200" />
            <FlightRoute
              departureTime={booking.returnFlight.departureTime}
              departureDate={booking.returnFlight.departureDate}
              departureCity={booking.arrivalCity}
              arrivalTime={booking.returnFlight.arrivalTime}
              arrivalDate={booking.returnFlight.arrivalDate}
              arrivalCity={booking.departureCity}
              flightNumber={booking.returnFlight.flightNumber}
              seatNumber={booking.returnFlight.seatNumber}
            />
          </>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200 space-y-2 sm:space-y-0">
          <div className="text-sm text-gray-500">Class: {booking.class}</div>
          <div className="text-lg font-bold text-gray-900">
            Price: ${booking.price}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          {isUpcoming ? (
            <>
              <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 text-center">
                Download Ticket
              </button>
              <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 text-center">
                Cancel Booking
              </button>
            </>
          ) : (
            <>
              <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 text-center">
                Download Receipt
              </button>
              <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 text-center">
                Book Again
              </button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
