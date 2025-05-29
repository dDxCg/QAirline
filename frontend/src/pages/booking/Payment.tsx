import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Container from '../../components/layout/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface PaymentForm {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flightDetails, passengerDetails, selectedSeat } = location.state || {};

  const [form, setForm] = useState<PaymentForm>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/booking/confirmation', {
      state: {
        flightDetails,
        passengerDetails,
        selectedSeat,
        paymentDetails: form,
      }
    });
  };

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
              <div className="w-16 h-0.5 bg-primary-600" />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  2
                </div>
                <span className="ml-2 font-medium text-primary-600">Payment</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300" />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
                  3
                </div>
                <span className="ml-2 text-gray-600">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="col-span-2">
              <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={form.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Holder Name *
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        required
                        value={form.cardHolder}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter card holder name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          value={form.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          required
                          value={form.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Secure Payment</h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>Your personal and payment information is protected with 256-bit SSL encryption.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button type="submit" variant="primary" size="lg">
                      Confirm Payment
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="col-span-1">
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
                {flightDetails && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Flight Number</p>
                        <p className="font-medium">{flightDetails.flightNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{flightDetails.class}</p>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className="font-medium">{flightDetails.departureCode}</p>
                          <p className="text-sm text-gray-600">{flightDetails.departureTime}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">{flightDetails.duration}</p>
                          <div className="w-24 h-px bg-gray-300 my-2 relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.64 14.26l2.86.95 4.02-4.02-8-4.59 1.16-1.16c.1-.1.26-.14.41-.1l9.3 2.98c1.58-1.58 3.15-3.2 4.77-4.75.31-.33.7-.58 1.16-.73.45-.16.87-.27 1.25-.34.55-.05.98.4.93.93-.07.38-.18.8-.34 1.25-.15.46-.4.85-.73 1.16l-4.75 4.78 2.97 9.29c.05.15 0 .29-.1.41l-1.17 1.16-4.57-8.02L8.8 17.5l.95 2.84L8.6 21.5l-2.48-3.62L2.5 15.4l1.14-1.14z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{flightDetails.arrivalCode}</p>
                          <p className="text-sm text-gray-600">{flightDetails.arrivalTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2 border-t border-gray-200">
                      <h4 className="font-medium mb-2">Passenger</h4>
                      <p className="text-gray-600">{passengerDetails.firstName} {passengerDetails.lastName}</p>
                    </div>

                    <div className="space-y-2 py-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Fare (1 Adult)</span>
                        <span className="font-medium">${flightDetails.price}</span>
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
                    </div>

                    <div className="flex justify-between pt-4 border-t border-gray-200">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold text-primary-600">
                        ${flightDetails.price + 89 + 25 + (selectedSeat ? 25 : 0)}
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Payment; 