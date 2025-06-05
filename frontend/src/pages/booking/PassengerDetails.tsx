import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Container from '../../components/layout/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface PassengerForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

interface AdditionalServices {
  extraBaggage: boolean;
  travelInsurance: boolean;
  priorityBoarding: boolean;
}

const PassengerDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flightDetails = location.state?.flightDetails;

  const [form, setForm] = useState<PassengerForm>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
  });

  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [additionalServices, setAdditionalServices] = useState<AdditionalServices>({
    extraBaggage: false,
    travelInsurance: false,
    priorityBoarding: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service: keyof AdditionalServices) => {
    setAdditionalServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const calculateTotal = () => {
    let total = flightDetails.price + 89 + 25; // Base fare + Taxes & Fees + Service Fee
    
    if (selectedSeat) {
      total += 25; // Seat selection fee
    }
    
    if (additionalServices.extraBaggage) {
      total += 75;
    }
    if (additionalServices.travelInsurance) {
      total += 45;
    }
    if (additionalServices.priorityBoarding) {
      total += 35;
    }
    
    return total;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/booking/payment', { 
      state: { 
        passengerDetails: form,
        selectedSeat,
        additionalServices,
        flightDetails,
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
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  1
                </div>
                <span className="ml-2 font-medium text-primary-600">Passenger Details</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300" />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
                  2
                </div>
                <span className="ml-2 text-gray-600">Payment</span>
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
            {/* Passenger Form */}
            <div className="col-span-2">
              <Card>
                <form onSubmit={handleContinue} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Passenger Information</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        value={form.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        required
                        value={form.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        required
                        value={form.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality *
                      </label>
                      <select
                        name="nationality"
                        required
                        value={form.nationality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select nationality</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        {/* Add more nationalities */}
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Passport Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number *
                        </label>
                        <input
                          type="text"
                          name="passportNumber"
                          required
                          value={form.passportNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter passport number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Expiry Date *
                        </label>
                        <input
                          type="date"
                          name="passportExpiry"
                          required
                          value={form.passportExpiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Seat Selection (Optional)</h3>
                    <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <p className="text-gray-600 mb-4">Seat map will be displayed here</p>
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                          onClick={() => {}}
                        >
                          Choose Seat (+$25)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="extra-baggage"
                            type="checkbox"
                            checked={additionalServices.extraBaggage}
                            onChange={() => handleServiceChange('extraBaggage')}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="extra-baggage" className="font-medium text-gray-700">Extra Baggage (23kg)</label>
                          <p className="text-gray-500 text-sm">Add an additional checked bag</p>
                          <p className="text-primary-600 font-medium">$75</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="travel-insurance"
                            type="checkbox"
                            checked={additionalServices.travelInsurance}
                            onChange={() => handleServiceChange('travelInsurance')}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="travel-insurance" className="font-medium text-gray-700">Travel Insurance</label>
                          <p className="text-gray-500 text-sm">Comprehensive travel protection</p>
                          <p className="text-primary-600 font-medium">$45</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="priority-boarding"
                            type="checkbox"
                            checked={additionalServices.priorityBoarding}
                            onChange={() => handleServiceChange('priorityBoarding')}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="priority-boarding" className="font-medium text-gray-700">Priority Boarding</label>
                          <p className="text-gray-500 text-sm">Board the aircraft first</p>
                          <p className="text-primary-600 font-medium">$35</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="col-span-1">
              <Card>
                <form onSubmit={handleContinue}>
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
                        {additionalServices.extraBaggage && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Extra Baggage</span>
                            <span className="font-medium">$75</span>
                          </div>
                        )}
                        {additionalServices.travelInsurance && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Travel Insurance</span>
                            <span className="font-medium">$45</span>
                          </div>
                        )}
                        {additionalServices.priorityBoarding && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority Boarding</span>
                            <span className="font-medium">$35</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between pt-4 border-t border-gray-200">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold text-primary-600">
                          ${calculateTotal()}
                        </span>
                      </div>

                      <div className="pt-6">
                        <Button type="submit" variant="primary" size="lg" className="w-full">
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default PassengerDetails; 