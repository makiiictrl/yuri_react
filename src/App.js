import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Layouts/Header";
import Loader from "./Layouts/Loader";
import Sidebar from "./Layouts/Sidebar";
import Footer from "./Layouts/Footer";
import Dashboard from "./Layouts/Dashboard";

import AgentUserMenuIndex from "./components/AgentUserMenu/Index";
import AgentUserMenuNew from "./components/AgentUserMenu/New";



export default App = () => {
  return (
    <>
        {/* <Loader /> */}
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Header />
            <div className="page-body-wrapper">
                <Sidebar />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Agent User Menu */}
                    <Route path="/agent_user_menus" element={<AgentUserMenuIndex/>} />
                    <Route path="/agent_user_menus/new" element={<AgentUserMenuNew/>} />
                    {/* <Route path="/agent_user_menus/edit" element={<AgentUserMenuEdit/>} /> */}
                
                </Routes>
                <Footer/>
            </div>
        </div>
        
    </>
  );
};
