import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Container from '../components/layout/Container';
import Card from '../components/common/Card';

interface Booking {
  id: string;
  flightNumber: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
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
  class: 'Economy' | 'Premium Economy' | 'Business';
  price: number;
}

const MyTickets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock data - replace with actual API call
  const bookings: Booking[] = [
    {
      id: '1',
      flightNumber: 'QA101',
      status: 'Confirmed',
      bookingNumber: 'QA-2024-001',
      departureCity: 'New York',
      departureCode: 'NYC',
      arrivalCity: 'London',
      arrivalCode: 'LON',
      departureTime: '08:30',
      departureDate: 'Dec 15, 2024',
      arrivalTime: '20:45',
      arrivalDate: 'Dec 15, 2024',
      seatNumber: '12A',
      class: 'Economy',
      price: 713
    },
    {
      id: '2',
      flightNumber: 'QA205',
      status: 'Confirmed',
      bookingNumber: 'QA-2024-002',
      departureCity: 'London',
      departureCode: 'LON',
      arrivalCity: 'New York',
      arrivalCode: 'NYC',
      departureTime: '14:20',
      departureDate: 'Dec 22, 2024',
      arrivalTime: '17:15',
      arrivalDate: 'Dec 22, 2024',
      seatNumber: '8C',
      class: 'Premium Economy',
      price: 849
    },
    {
      id: '3',
      flightNumber: 'QA307',
      status: 'Pending',
      bookingNumber: 'QA-2024-003',
      departureCity: 'New York',
      departureCode: 'NYC',
      arrivalCity: 'Paris',
      arrivalCode: 'PAR',
      departureTime: '22:10',
      departureDate: 'Jan 10, 2025',
      arrivalTime: '11:30',
      arrivalDate: 'Jan 11, 2025',
      seatNumber: '3B',
      class: 'Business',
      price: 1299
    },
    {
      id: '4',
      flightNumber: 'QA156',
      status: 'Completed',
      bookingNumber: 'QA-2023-045',
      departureCity: 'New York',
      departureCode: 'NYC',
      arrivalCity: 'Tokyo',
      arrivalCode: 'TOK',
      departureTime: '16:45',
      departureDate: 'Nov 15, 2023',
      arrivalTime: '20:30',
      arrivalDate: 'Nov 16, 2023',
      seatNumber: '15F',
      class: 'Economy',
      price: 899
    }
  ];

  const upcomingBookings = bookings.filter(booking => booking.status !== 'Completed');
  const pastBookings = bookings.filter(booking => booking.status === 'Completed');

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg
                className="w-6 h-6 text-gray-600"
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
            </button>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'upcoming'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Upcoming Flights
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'past'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Past Flights
                </button>
              </nav>
            </div>
          </div>

          <div className="space-y-4">
            {(activeTab === 'upcoming' ? upcomingBookings : pastBookings).map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-medium text-primary-600">{booking.flightNumber}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Booking: {booking.bookingNumber}</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-12">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{booking.departureTime}</div>
                      <div className="text-sm text-gray-500">{booking.departureDate}</div>
                      <div className="text-lg font-medium text-gray-900 mt-1">{booking.departureCode}</div>
                    </div>

                    <div className="flex-1 flex items-center">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <svg className="w-6 h-6 text-gray-400 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14m-7-7l7 7-7 7"
                        />
                      </svg>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{booking.arrivalTime}</div>
                      <div className="text-sm text-gray-500">{booking.arrivalDate}</div>
                      <div className="text-lg font-medium text-gray-900 mt-1">{booking.arrivalCode}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">Seat: {booking.seatNumber}</div>
                    <div className="text-sm text-gray-500">Class: {booking.class}</div>
                    <div className="text-lg font-bold text-gray-900 mt-1">Price: ${booking.price}</div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  {activeTab === 'upcoming' ? (
                    <>
                      <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                        Download Ticket
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">
                        Manage Booking
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700">
                        Cancel Booking
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                        Download Receipt
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100">
                        Book Again
                      </button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default MyTickets; 