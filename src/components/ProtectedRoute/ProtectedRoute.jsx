import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
