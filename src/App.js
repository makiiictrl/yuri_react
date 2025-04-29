import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./Login/LoginForm";
import ProtectedRoute from "./Login/ProtectedRoute";

import DefaultDashboard from "./Login/DefaultDashboard";
import MainLayout from "./Layouts/MainLayout";


import AgentUserMenuIndex from "./Components/AgentUserMenu/Index";
import AgentUserMenuForm from "./Components/AgentUserMenu/Form";

import TransferSlips from "./Components/TransferSlips/Index";
import TransferSlipsShow from "./Components/TransferSlips/Show";
import TransferSlipsForm from "./Components/TransferSlips/Form";
import TransferSlipsEdit from "./Components/TransferSlips/Edit"

import RequestSlipIndex from "./Components/RequestSips/Index"
import RequestSlipForm from "./Components/RequestSips/Form"

import InventoriesForm from "./Components/InventoryEntries/Form"

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

        {/* Agent User Menus */}
        <Route path="agent_user_menus" element={<AgentUserMenuIndex />} />
        <Route path="agent_user_menus/new" element={<AgentUserMenuForm />} />
        <Route path="agent_user_menus/edit/:id" element={<AgentUserMenuForm />} />

        {/* Transfer Slips */}
        <Route path="transfer_slips" element={<TransferSlips />} />
        <Route path="transfer_slips/:id" element={<TransferSlipsShow/>} />
        <Route path="transfer_slips/new" element={<TransferSlipsForm/>} />
        <Route path="transfer_slips/edit/:id" element={<TransferSlipsEdit/>}/>

        {/* Request Slips */}
        <Route path="request_slips" element={<RequestSlipIndex/>}/>
        <Route path="request_slips/new" element={<RequestSlipForm/>}/>
        <Route path="request_slips/edit/:id" element={<RequestSlipForm/>}/>

        {/* Inventories */}
        <Route path="inventories/new" element={<InventoriesForm/>}/>
        
      </Route>
    </Routes>
  );
};

export default App;