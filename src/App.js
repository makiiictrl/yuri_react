import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./Login/LoginForm";
import ProtectedRoute from "./Login/ProtectedRoute";
import RoleProtectedRoute from "./Login/RoleProtectedRoute";

import DefaultDashboard from "./Login/DefaultDashboard";
import MainLayout from "./Layouts/MainLayout";


import AgentUserMenuIndex from "./Components/AgentUserMenu/Index";
import AgentUserMenuForm from "./Components/AgentUserMenu/Form";

import RequestSlipIndex from "./Components/RequestSips/Index"
import RequestSlipForm from "./Components/RequestSips/Form"

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

        <Route index element={<DefaultDashboard />} />
        <Route path="/dashboard" element={<DefaultDashboard />} />

        {/* Index route for "/" - shows Dashboard if logged in */}
       
        {/* Agent User Menus */}
        <Route path="agent_user_menus" element={<AgentUserMenuIndex />} />
        <Route path="agent_user_menus/new" element={<AgentUserMenuForm />} />
        <Route path="agent_user_menus/edit/:id" element={<AgentUserMenuForm />} />
        {/* <Route path="agent_user_menus/:id" element={<AgentUserMenuShow />} /> */}

        {/* Request Slips */}
        <Route path="request_slips" element={<RequestSlipIndex/>}/>
        <Route path="request_slips/new" element={<RequestSlipForm/>}/>
        <Route path="request_slips/edit/:id" element={<RequestSlipForm/>}/>
      </Route>
    </Routes>
  );
};

export default App;