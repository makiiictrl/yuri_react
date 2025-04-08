import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Layouts/Dashboard";
import AgentUserMenuIndex from "./Components/AgentUserMenu/Index";
import AgentUserMenuEdit from "./Components/AgentUserMenu/Edit";
import AgentUserMenuNew from "./Components/AgentUserMenu/New";
import LoginForm from "./Login/LoginForm";
import ProtectedRoute from "./Login/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import TrasferSlipsIndex from "./Components/TransferSlips/Index"; 


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
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agent_user_menus" element={<AgentUserMenuIndex />} />
        <Route path="agent_user_menus/edit/:id" element={<AgentUserMenuEdit />} />
        <Route path="agent_user_menus/new" element={<AgentUserMenuNew />} />
        <Route path="transfer_slips" element={<TrasferSlipsIndex/>} />
      </Route>
    </Routes>
  );
};

export default App;
