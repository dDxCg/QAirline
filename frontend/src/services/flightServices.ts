import api from "./api";

interface FlightSearchData {
  origin: string;
  destination: string;
  departureTime: string;
}

const flightServices = {
  searchFlights: async (data: FlightSearchData) => {
    try {
      const response = await api.post("/flight/search", data);
      console.log("Flight search response from backend:", response);
      return response.data;
    } catch (error) {
      console.error("Error searching flights:", error);
      throw error;
    }
  },
};

export default flightServices;
