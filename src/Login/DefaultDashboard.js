// DefaultDashboard.js
import React from 'react';
import UseCurrentAgent from './UseCurrentAgent';
import AdminDashboard from '../Components/AdminDashboard/Index';
import Dashboard from '../Layouts/Dashboard';

const DefaultDashboard = () => {
  const { agent, loading } = UseCurrentAgent();

  if (loading) return <div>Loading...</div>;

  // If agent exists and has admin or super_admin role, show the admin dashboard,
  // otherwise, show the normal dashboard.
  if (agent && (agent.roles.includes('admin') || agent.roles.includes('super_admin'))) {
    return <AdminDashboard />;
  }

  return <Dashboard />;
};

export default DefaultDashboard;
