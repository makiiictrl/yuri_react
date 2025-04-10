// RoleProtectedRoute.js
import React, { useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseCurrentAgent from './UseCurrentAgent';

const RoleProtectedRoute = ({ allowedRoles, alertMessage, children }) => {
  const { agent, loading } = UseCurrentAgent();
  const location = useLocation();
  const alertShown = useRef(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!agent) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!agent.roles || !agent.roles.some((role) => allowedRoles.includes(role))) {
    if (alertMessage && !alertShown.current) {
      window.alert(alertMessage);
      alertShown.current = true;
    }
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleProtectedRoute;
