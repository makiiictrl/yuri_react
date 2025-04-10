// ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const agentJSON = localStorage.getItem('agent');
  const agent = agentJSON ? JSON.parse(agentJSON) : null;

  // Check if the logged-in agent is an admin.
  // We assume an admin will have agent.admin === 1.
  if (!agent || agent.admin !== 1) {
    // If not an admin, redirect to the regular dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
