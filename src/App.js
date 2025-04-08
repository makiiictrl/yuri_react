import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './Layouts/Dashboard';
import AgentUserMenuIndex from './Components/AgentUserMenu/Index';
import AgentUserMenuNew from './Components/AgentUserMenu/New';
import AdminDashboard from './Layouts/AdminDashboard'; 
import LoginForm from './Login/LoginForm';
import ProtectedRoute from './Login/ProtectedRoute';
import ProtectedAdminRoute from './Login/ProtectedAdminRoute';
import MainLayout from './Layouts/MainLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      
      {/* Protected routes with MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Regular user routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agent_user_menus" element={<AgentUserMenuIndex />} />
        <Route path="/agent_user_menus/new" element={<AgentUserMenuNew />} />
        
        {/* Admin route */}
        <Route 
          path="/admin_dashboard" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
      </Route>

      {/* Optionally, redirect any unknown route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
