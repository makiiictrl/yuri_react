import React, { useState, useEffect } from "react";
import Header from "./Layouts/Header";
import Loader from "./Layouts/Loader";
import Sidebar from "./Layouts/Sidebar";
import Footer from "./Layouts/Footer";
import Dashboard from "./Components/Dashboard";

export default App = () => {
  return (
    <>
        {/* <Loader /> */}
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <Header />
            <div className="page-body-wrapper">
                <Sidebar />
                <Dashboard />
                <Footer/>
            </div>
        </div>
        
    </>
  );
};
