// MainLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <Header />
      <div className="page-body-wrapper">
        <Sidebar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
