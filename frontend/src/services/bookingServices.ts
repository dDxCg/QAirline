import api from "./api";

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

const bookingServices = {
  createBooking: async (bookingData: BookingForm) => {
    try {
      const response = await api.post("/ticket/booking", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },
};

export default bookingServices;
