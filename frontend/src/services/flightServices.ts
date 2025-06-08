import api from "./api";

interface FlightSearchData {
  origin: string;
  destination: string;
  departureTime: string;
}

interface NewFlight {
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  plane_id: number;
  economy_price: number;
  premium_economy_price: number;
  business_price: number;
  first_class_price: number;
}

const flightServices = {
  searchFlights: async (data: FlightSearchData) => {
    try {
      const response = await api.post("/flight/search", data);
      console.log("Flight search response from backend:", response);
      return response.data.flights || []; // Ensure we return an empty array if no flights found
    } catch (error) {
      console.error("Error searching flights:", error);
      throw error;
    }
  },
  getAllFlights: async () => {
    try {
      const response = await api.get("/flight/all", {
        params: { _: Date.now() },
      });
      console.log("All flights response from backend:", response);
      return response.data.flights || []; // Ensure we return an empty array if no flights found
    } catch (error) {
      console.error("Error fetching all flights:", error);
      throw error;
    }
  },
  createFlight: async (data: NewFlight) => {
    try {
      const response = await api.post("/flight/create", data);
      console.log("New flight creation response from backend:", response);
      return response.data;
    } catch (error) {
      console.error("Error creating new flight:", error);
      throw error;
    }
  },
};

export default flightServices;
