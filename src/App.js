import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./Login/LoginForm";
import ProtectedRoute from "./Login/ProtectedRoute";

import DefaultDashboard from "./Login/DefaultDashboard";
import MainLayout from "./Layouts/MainLayout";


import AgentUserMenuIndex from "./Components/AgentUserMenu/Index";
import AgentUserMenuForm from "./Components/AgentUserMenu/Form";
<<<<<<< HEAD
import TransferSlips from "./Components/TransferSlip/Index";
import Show from "./Components/TransferSlip/Show";
import Form from "./Components/TransferSlip/Form";
import Edit from "./Components/TransferSlip/Edit"
=======

import TransferSlips from "./Components/TransferSlips/Index";
import TransferSlipsShow from "./Components/TransferSlips/Show";
import TransferSlipsForm from "./Components/TransferSlips/Form";
import TransferSlipsEdit from "./Components/TransferSlips/Edit"
>>>>>>> adf12aa53759f4b4bf3dbe813b90c00fc1f41494

import RequestSlipIndex from "./Components/RequestSlip/Index"
import RequestSlipForm from "./Components/RequestSlip/Form"

<<<<<<< HEAD
import IssueSlipIndex from "./Components/IssueSlip/Index";
import IssueSlipForm from "./Components/IssueSlip/Form";
=======
import InventoriesForm from "./Components/InventoryEntries/Form"

// import AgentUserMenuShow from "./Components/AgentUserMenu/";
>>>>>>> adf12aa53759f4b4bf3dbe813b90c00fc1f41494

import InventoriesIndex from "./Components/InventoryListing/Index";
// import InventoriesForm from "./Components/InventoryListing/Form";

import ItemMasterIndex from "./Components/ItemMaster/Index";
import ItemMasterForm from "./Components/ItemMaster/Form";


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

<<<<<<< HEAD
        {/* Issue Slips */}
        <Route path="issue_slips" element={<IssueSlipIndex/>}/>
        <Route path="issue_slips/new" element={<IssueSlipForm/>}/>
        <Route path="issue_slips/edit/:id" element={<IssueSlipForm/>}/>

        {/* Inventories */}
        <Route path="inventories" element={<InventoriesIndex/>}/>

        {/* Item Master */}
        <Route path="item_masters" element={<ItemMasterIndex/>}/>
        <Route path="item_masters/new" element={<ItemMasterForm/>}/>
        <Route path="item_masters/edit/:id" element={<ItemMasterForm/>}/>
=======
        {/* Inventories */}
        <Route path="inventories/new" element={<InventoriesForm/>}/>
        
>>>>>>> adf12aa53759f4b4bf3dbe813b90c00fc1f41494
      </Route>
    </Routes>
  );
};

export default App;