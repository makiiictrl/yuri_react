import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Login/LoginForm";
import ProtectedRoute from "./Login/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";

import Dashboard from "./Layouts/Dashboard";

import AgentUserMenuIndex from "./Components/AgentUserMenu/Index";
import AgentUserMenuForm from "./Components/AgentUserMenu/Form";
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
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agent_user_menus" element={<AgentUserMenuIndex />} />
        <Route path="agent_user_menus/new" element={<AgentUserMenuForm />} />
        <Route path="agent_user_menus/edit/:id" element={<AgentUserMenuForm />} />
        {/* <Route path="agent_user_menus/:id" element={<AgentUserMenuShow />} /> */}
      </Route>
    </Routes>
  );
};

export default App;