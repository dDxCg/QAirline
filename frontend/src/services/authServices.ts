import api from "./api";

interface loginData {
  email: string;
  password: string;
}

interface registerData {
  name: string;
  email: string;
  password: string;
}

const authServices = {
  login: async (data: loginData) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.headers["authorization"];
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("No token received from server");
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  guest: async () => {
    try {
      const response = await api.post("/auth/guest");
      const token = response.headers["authorization"];
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("No token received from server");
      }
      return response.data;
    } catch (error) {
      console.error("Guest login error:", error);
      throw error;
    }
  },

  register: async (data: registerData) => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authServices;
