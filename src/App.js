import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./Login/LoginForm";
import ProtectedRoute from "./Login/ProtectedRoute";
import RoleProtectedRoute from "./Login/RoleProtectedRoute";

import DefaultDashboard from "./Login/DefaultDashboard";
import MainLayout from "./Layouts/MainLayout";


import AgentUserMenuIndex from "./Components/AgentUserMenu/Index";
import AgentUserMenuForm from "./Components/AgentUserMenu/Form";
import TransferSlips from "./Components/TransferSlips/Index";

// import AgentUserMenuShow from "./Components/AgentUserMenu/";



const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      
      {/* Protected routes wrapped in MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >

        

        {/* Index route for "/" - shows Dashboard if logged in */}
        <Route index element={<DefaultDashboard />} />
        <Route path="/dashboard" element={<DefaultDashboard />} />
        <Route path="agent_user_menus" element={<AgentUserMenuIndex />} />
        <Route path="agent_user_menus/new" element={<AgentUserMenuForm />} />
        <Route path="agent_user_menus/edit/:id" element={<AgentUserMenuForm />} />
        <Route path="transfer_slips" element={<TransferSlips />} />

        {/* <Route path="agent_user_menus/:id" element={<AgentUserMenuShow />} /> */}
      </Route>
    </Routes>
  );
};

export default App;