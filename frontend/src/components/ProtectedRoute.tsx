import React from "react";
import { Navigate } from "react-router-dom";
import { checkAuth, isAdmin } from "../utils/authUtils";
import { toast } from "react-hot-toast";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = checkAuth();
  const isAdminUser = isAdmin();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" replace />;
  } else if (isAdminUser) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = checkAuth();
  const isAdminUser = isAdmin();

  if (!isAuthenticated || !isAdminUser) {
    toast.error("You must be an admin to access this page.");
    // Redirect to home if not authenticated or not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};
