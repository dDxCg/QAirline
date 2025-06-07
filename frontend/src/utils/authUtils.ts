import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // Expiration time in seconds
  uuid: string;
  role: string;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now(); // in milliseconds
    return decoded.exp * 1000 < currentTime;
  } catch (e) {
    return true;
  }
};

export const checkAuth = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("account_uuid");
    return false;
  }
  return true;
};

export const isAdmin = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return false;
  }
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role === "admin";
  } catch (e) {
    return false;
  }
};

export const isGuest = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return true;
  }
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role === "guest";
  } catch (e) {
    return true;
  }
};
