import { jwtDecode } from "jwt-decode";
import api from "./api";

interface ProfileData {
  full_name: string;
  date_of_birth: Date; //yyyy-mm-dd
  gender: string;
  nationality: string;
  id_number: string;
  passport_number: string;
  passport_expiry_date: string;
  phone_number: string;
}

const profileServices = {
  getProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const decoded = jwtDecode<{ uuid: string }>(token);
      const account_uuid = decoded.uuid;

      const response = await api.post("/profile/info", { account_uuid });
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  updateProfile: async (data: ProfileData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const decoded = jwtDecode<{ uuid: string }>(token);
      const account_uuid = decoded.uuid;

      const response = await api.put("/profile/update", {
        ...data,
        account_uuid,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const decoded = jwtDecode<{ uuid: string }>(token);
      const account_uuid = decoded.uuid;

      const response = await api.delete("/profile/delete", {
        data: { account_uuid },
      });
      localStorage.removeItem("token"); // Clear token on account deletion
      return response.data;
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  },

  getAccount: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        throw new Error("No authentication token found");
      }
      const decoded = jwtDecode<{ email: string }>(token);
      const email = decoded.email;

      const response = await api.post("/profile/account", { email });
      return response.data;
    } catch (error) {
      console.error("Error fetching account:", error);
      throw error;
    }
  },
};

export default profileServices;
