import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import flightServices from "@/services/flightServices";
import SeatMap from "@/components/SeatMap";
import bookingServices from "@/services/bookingServices";

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

type Seat = {
  seat_row: number;
  seat_column: string;
  is_booked: boolean;
};

interface BookingForm {
  is_fetch: boolean;
  ticket_type: string;
  user_uuid: string | null;
  flight_uuid: string;
  seat_row: number;
  seat_column: string;
  return_flight_uuid: string | null;
  return_seat_row: number | null;
  return_seat_column: string | null;
  total_fare: number;
  full_name: string;
  email?: string | null;
  phone_number?: string | null;
  date_of_birth: string;
  gender: string;
  nationality: string;
  id_number?: string | null;
  passport_number?: string | null;
  passport_expiry_date?: string | null;
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
  const [seats, setSeats] = useState<Seat[]>([]);

  const [bookingForm, setBookingForm] = useState<BookingForm>({
    is_fetch: false,
    ticket_type: "one-way",
    user_uuid: null,
    flight_uuid: flightDetails?.flight_uuid || null,
    seat_row: 0,
    seat_column: "",
    return_flight_uuid: null,
    return_seat_row: null,
    return_seat_column: null,
    total_fare: 0,
    full_name: "",
    email: null,
    phone_number: null,
    date_of_birth: "",
    gender: "",
    nationality: "",
    id_number: null,
    passport_number: null,
    passport_expiry_date: null,
  });

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    //handle form submission
    if (tripType === "one-way") {
      // Set booking form for one-way trip
      bookingServices
        .createBooking(bookingForm)
        .then((response) => {
          console.log("Booking created successfully:", response);
          navigate("/my-tickets");
        })
        .catch((error) => {
          console.error("Error creating booking:", error);
          // Handle error (e.g., show notification)
        });
    } else {
      //handle round-trip booking
    }
  };

  useEffect(() => {
    const fetchSeatMap = async () => {
      if (flightDetails?.flight_uuid) {
        try {
          const response = await flightServices.getSeatMap(
            flightDetails.flight_uuid
          );
          setSeats(response);
        } catch (error) {
          console.error("Error fetching seat map:", error);
        }
      }
    };
    fetchSeatMap();
  }, []);

  useEffect(() => {
    const seat_row = sessionStorage.getItem("seat_row");
    const seat_column = sessionStorage.getItem("seat_column");
    if (seat_row && seat_column) {
      setSelectedSeat(`${seat_row}${seat_column}`);
      setBookingForm((prev) => ({
        ...prev,
        seat_row: parseInt(seat_row, 10),
        seat_column,
      }));
    }
    if (total_fare) {
      setBookingForm((prev) => ({
        ...prev,
        total_fare,
      }));
    }
  }, [total_fare, selectedSeat]);

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
                        name="full_name"
                        required
                        value={bookingForm.full_name}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            full_name: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter full name"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        required
                        value={bookingForm.date_of_birth}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            date_of_birth: e.target.value,
                          }))
                        }
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
                        value={bookingForm.email ?? ""}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
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
                        name="phone_number"
                        required
                        value={bookingForm.phone_number ?? ""}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            phone_number: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter phone number"
                        autoComplete="tel"
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
                        value={bookingForm.gender}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        aria-label="Gender"
                      >
                        <option value="other">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality *
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        required
                        value={bookingForm.nationality}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            nationality: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter nationality"
                        aria-label="Nationality"
                      />
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
                          name="id_number"
                          value={bookingForm.id_number || ""}
                          onChange={(e) =>
                            setBookingForm((prev) => ({
                              ...prev,
                              id_number: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter ID number"
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          name="passport_number"
                          required
                          value={bookingForm.passport_number ?? ""}
                          onChange={(e) =>
                            setBookingForm((prev) => ({
                              ...prev,
                              passport_number: e.target.value,
                            }))
                          }
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
                          name="passport_expiry_date"
                          required
                          value={bookingForm.passport_expiry_date ?? ""}
                          onChange={(e) =>
                            setBookingForm((prev) => ({
                              ...prev,
                              passport_expiry_date: e.target.value,
                            }))
                          }
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
                        <p className="text-gray-600 mb-4">
                          <SeatMap seats={seats} />
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
            <div>
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
                      <div className="flex justify-between font-semibold pt-2 border-t border-gray-100 mt-2"></div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full mt-6"
                      onClick={handleContinue}
                    >
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
