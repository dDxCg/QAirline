import React from "react";
import { Navigate } from "react-router-dom";
import { checkAuth, isAdmin } from "../utils/authUtils";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = checkAuth();
  const isUserAdmin = isAdmin();

  if (!isAuthenticated || !isUserAdmin) {
    // Redirect to home if not authenticated or not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};
