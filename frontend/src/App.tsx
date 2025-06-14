import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Profile from "./pages/Profile";
import Flights from "./pages/Flights";
import MyTickets from "./pages/MyTickets";
import BookingDetails from "./pages/booking/BookingDetails";
import AdminPage from "./pages/AdminPage";

// Temporarily commented out for development
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import api from "./services/api";
import { Book } from "lucide-react";

function App() {
  useEffect(() => {
    console.log("🔍 Checking backend API...");
    api
      .get("/ping") // or '/health' or similar
      .then(() => {
        console.log("Backend API is reachable");
      })
      .catch((error) => {
        console.error("Backend API is NOT reachable", error.message || error);
      });
  }, []);

  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "1.25rem",
            fontWeight: "bold",
          },
          error: {
            style: {
              background: "#ffe6e6",
            },
            icon: "❌",
            duration: 1500,
          },
          success: {
            style: {
              background: "#e6ffe6",
            },
            icon: "✅",
            duration: 1000,
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />

        {/* Protected Routes (protection temporarily disabled for development) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/flights"
          element={
            <ProtectedRoute>
              <Flights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tickets"
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-details"
          element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes (now protected) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
