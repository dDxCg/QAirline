import api from "./api";

interface Plane {
  model: string;
  capacity: number;
  manufacturer: string;
  seat_map: string;
}

const planeServices = {
  createPlane: async (data: Plane) => {
    try {
      const response = await api.post("/plane/create", data);
      console.log("Plane data response from backend:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching plane data:", error);
      throw error;
    }
  },
};

export default planeServices;
