// ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token"); 

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

