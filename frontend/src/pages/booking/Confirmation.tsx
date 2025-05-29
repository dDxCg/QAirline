import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Container from '../../components/layout/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const { flightDetails, passengerDetails, selectedSeat } = location.state || {};

  // Generate a random booking reference
  const bookingReference = 'QA' + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          {/* Progress Steps */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="ml-2 text-gray-600">Passenger Details</span>
              </div>
              <div className="w-16 h-0.5 bg-green-500" />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="ml-2 text-gray-600">Payment</span>
              </div>
              <div className="w-16 h-0.5 bg-primary-600" />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  3
                </div>
                <span className="ml-2 font-medium text-primary-600">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">
                Your flight has been booked successfully. A confirmation email has been sent to {passengerDetails?.email}
              </p>
            </div>

            {/* Booking Details */}
            <Card className="mb-8">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Booking Reference</p>
                    <p className="text-2xl font-bold text-primary-600">{bookingReference}</p>
                  </div>
                  <Link to="/my-tickets">
                    <Button variant="outline" size="sm">
                      View Ticket
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {/* Flight Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Flight Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600">Flight</p>
                        <p className="font-medium">{flightDetails?.flightNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Class</p>
                        <p className="font-medium">{flightDetails?.class}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">{flightDetails?.departureCity}</div>
                        <div className="font-medium">{flightDetails?.departureCode}</div>
                        <div className="text-sm text-gray-600">{flightDetails?.departureTime}</div>
                      </div>
                      <div className="flex-1 px-4">
                        <div className="relative">
                          <div className="absolute w-full top-1/2 border-t-2 border-gray-300 border-dashed"></div>
                          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2">
                            <p className="text-xs text-gray-500">{flightDetails?.duration}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{flightDetails?.arrivalCity}</div>
                        <div className="font-medium">{flightDetails?.arrivalCode}</div>
                        <div className="text-sm text-gray-600">{flightDetails?.arrivalTime}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Passenger Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">
                        {passengerDetails?.firstName} {passengerDetails?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{passengerDetails?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{passengerDetails?.phoneNumber}</p>
                    </div>
                    {selectedSeat && (
                      <div>
                        <p className="text-sm text-gray-600">Seat</p>
                        <p className="font-medium">{selectedSeat}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Fare (1 Adult)</span>
                      <span className="font-medium">${flightDetails?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-medium">$89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">$25</span>
                    </div>
                    {selectedSeat && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seat Selection</span>
                        <span className="font-medium">$25</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-bold">Total Paid</span>
                        <span className="font-bold text-primary-600">
                          ${flightDetails?.price + 89 + 25 + (selectedSeat ? 25 : 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <Link to="/my-tickets">
                <Button variant="outline" size="lg">
                  View My Tickets
                </Button>
              </Link>
              <Link to="/flights">
                <Button variant="primary" size="lg">
                  Book Another Flight
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Confirmation; 