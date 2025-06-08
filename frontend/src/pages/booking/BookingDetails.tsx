import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

interface PassengerForm {
  id_number: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

const BookingDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flightDetails = location.state?.flightDetails;
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [extra_baggage, travel_insurance, priority_boarding] = [
    300000, 70000, 100000,
  ];
  const [total_fare, setTotalFare] = useState<number>(0);

  const [form, setForm] = useState<PassengerForm>({
    id_number: "",
    full_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
  });

  const [selectedSeat, setSelectedSeat] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/booking/payment", {
      state: {
        passengerDetails: form,
        selectedSeat,
        flightDetails,
      },
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <div className="grid grid-cols-3 gap-8">
            {/* Passenger Form */}
            <div className="col-span-2">
              <Card>
                <form onSubmit={handleContinue} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Booking Information
                    </h2>
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
                        One way
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
                        Round trip
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.full_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        required
                        value={form.date_of_birth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Select date of birth"
                        title="Date of Birth"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        value={form.phone_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
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
                        aria-label="Gender"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <select
                        name="nationality"
                        required
                        value={form.nationality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        aria-label="Nationality"
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      ID & Passport Information *
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID Number
                        </label>
                        <input
                          type="text"
                          name="idNumber"
                          value={form.id_number || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter ID number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number
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
                          Passport Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          name="passportExpiry"
                          required
                          value={form.passportExpiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="MM/YY"
                          pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                          title="Enter expiry date in MM/YY format"
                          maxLength={5}
                          inputMode="numeric"
                          autoComplete="cc-exp"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Seat Selection
                    </h3>
                    <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 mx-auto mb-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                        <p className="text-gray-600 mb-4">
                          Seat map will be displayed here
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
            <div>
              {" "}
              <Card>
                <div className="p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Booking Summary
                  </h3>
                  <div className="text-sm text-gray-700">
                    <div className="flex justify-between mb-1">
                      <span>Flight:</span>
                      <span className="font-mono">
                        {flightDetails?.flight_uuid || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Seat:</span>
                      <span>{selectedSeat || "-"}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Base Price:</span>
                      <span>
                        {flightDetails?.base_price
                          ? `$${flightDetails.base_price}`
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="font-medium text-gray-800 mb-2 text-sm">
                      Additional Services
                    </h4>
                    <div className="flex flex-col gap-2 text-sm">
                      <label className="inline-flex items-center justify-between">
                        <div>
                          <input
                            type="checkbox"
                            name="extra_baggage"
                            className="form-checkbox"
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setTotalFare((prev) =>
                                checked
                                  ? prev + extra_baggage
                                  : prev - extra_baggage
                              );
                            }}
                          />
                          <span className="ml-2">Extra Baggage (&gt;23kg)</span>
                        </div>
                        <span className="ml-2 text-gray-500">
                          +{extra_baggage.toLocaleString()}đ
                        </span>
                      </label>
                      <label className="inline-flex items-center justify-between">
                        <div>
                          <input
                            type="checkbox"
                            name="travel_insurance"
                            className="form-checkbox"
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setTotalFare((prev) =>
                                checked
                                  ? prev + extra_baggage
                                  : prev - extra_baggage
                              );
                            }}
                          />
                          <span className="ml-2">Travel Insurance</span>
                        </div>
                        <span className="ml-2 text-gray-500">
                          +{travel_insurance.toLocaleString()}đ
                        </span>
                      </label>
                      <label className="inline-flex items-center justify-between">
                        <div>
                          <input
                            type="checkbox"
                            name="priority_boarding"
                            className="form-checkbox"
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setTotalFare((prev) =>
                                checked
                                  ? prev + priority_boarding
                                  : prev - priority_boarding
                              );
                            }}
                          />
                          <span className="ml-2">Priority Boarding</span>
                        </div>
                        <span className="ml-2 text-gray-500">
                          +{priority_boarding.toLocaleString()}đ
                        </span>
                      </label>
                      <div className="flex justify-between font-semibold pt-2 border-t border-gray-100 mt-2">
                        <span>Total</span>
                        <span>
                          {(
                            (flightDetails?.base_price || 0) + total_fare
                          ).toLocaleString()}
                          đ
                        </span>
                      </div>
                    </div>
                    <Button type="submit" className="w-full mt-6">
                      {sessionStorage.getItem("tripType") === "round-trip"
                        ? "Book Return Flight"
                        : "Book Ticket"}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default BookingDetails;
