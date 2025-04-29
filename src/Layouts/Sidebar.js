import React from "react";
import { Link } from "react-router-dom";
import UseCurrentAgent from "../Login/UseCurrentAgent";

export default Sidebar = () => {
  const { agent, loading } = UseCurrentAgent();
  
  return (
    <div className="sidebar-wrapper" data-sidebar-layout="stroke-svg">
      <div>
        <div className="logo-wrapper">
          <Link to="/dashboard">
            <img
              className="img-fluid"
              src="../assets/images/logo/cathay-wh.png"
              alt=""
            />
          </Link>
          <div className="back-btn">
            <i className="fa fa-angle-left"></i>
          </div>
          <div className="toggle-sidebar">
            <i
              className="status_toggle middle sidebar-toggle"
              data-feather="grid"
            >
              {" "}
            </i>
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to="/dashboard">
            <img
              className="img-fluid"
              src="../assets/images/logo/cathay-wh.png"
              alt=""
              style={{ width: "30px" }}
            />
          </Link>
        </div>
        <div className="profile-section sidebar-search">
          <div className="profile-wrapper">
            <div className="active-profile">
              {" "}
              <img
                className="img-fluid"
                src="../assets/images/user.png"
                alt="user"
              />
              <div className="status bg-success"> </div>
            </div>
            <div>
              <h4>
                {agent?.first_name} {agent?.last_name}
              </h4>
              <span>Junior Web and SQL Developer</span>
            </div>
          </div>
        </div>

        <div className="sidebar-search">
          <div className="input-group">
            <span className="input-group-text" id="sidebar-search">
              <svg>
                <use href="../assets/svg/icon-sprite.svg#search"></use>
              </svg>
            </span>
            <input
              className="form-control"
              type="text"
              placeholder="Quick search"
              aria-label="Username"
              aria-describedby="sidebar-search"
            />
          </div>
        </div>

        <nav className="sidebar-main">
          <div className="left-arrow" id="left-arrow">
            <i data-feather="arrow-left"></i>
          </div>
          <div id="sidebar-menu">
            <ul className="sidebar-links" id="simple-bar">
              <li className="back-btn">
                <Link to="/">
                  <img
                    className="img-fluid"
                    src="../assets/images/logo/logo-icon.png"
                    alt=""
                  />
                </Link>
                <div className="mobile-back text-end">
                  <span>Back</span>
                  <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
                </div>
              </li>
              <li className="pin-title sidebar-main-title">
                <div>
                  <h6>- Pinned</h6>
                </div>
              </li>
              <li className="sidebar-main-title">
                <div>
                  <h6 className="lan-1">- Navigation</h6>
                </div>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link
                  className="sidebar-link sidebar-title link-nav"
                  to="/dashboard"
                >
                  <i className="icofont icofont-user-alt-7 me-2 text-white"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link
                  className="sidebar-link sidebar-title link-nav"
                  to="/agent_user_menus"
                >
                  <i className="icofont icofont-users me-2 text-white"></i>
                  <span>Agent User Menus</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a className="sidebar-link sidebar-title link-nav" href="/">
                <i className="icofont icofont-growth me-2 text-white"></i>
                  <span>Marketing</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link
                  className="sidebar-link sidebar-title link-nav"
                  to="/transfer_slips"
                >
                <i className="icofont icofont-paper-plane me-2 text-white"></i>
                  <span>Transfer Slip</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link className="sidebar-link sidebar-title link-nav" to="/request_slips">
                <i className="icofont icofont-document-folder me-2 text-white"></i>
                  <span>Request Slip</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link className="sidebar-link sidebar-title link-nav" to="/issue_slips">
                  <i className="icofont icofont-paper me-2 text-white"></i>
                  <span>Issue Slip</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a className="sidebar-link sidebar-title link-nav" href="/">
                <i className="icofont icofont-mail me-2 text-white"></i>
                  <span>Inventory Entry</span>
                </a>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link className="sidebar-link sidebar-title link-nav" to="/inventories">
                <i className="icofont icofont-list me-3 text-white"></i>
                  <span>Inventory Listing</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <Link className="sidebar-link sidebar-title link-nav" to="/item_masters">
                <i className="icofont icofont-papers me-2 text-white"></i>
                  <span>Item Master</span>
                </Link>
              </li>
              <li className="sidebar-list">
                <i className="fa fa-thumb-tack"></i>
                <a className="sidebar-link sidebar-title link-nav" href="/">
                <i className="icofont icofont-package me-2 text-white"></i>
                  <span>Packing List</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right"></i>
          </div>
        </nav>
      </div>
    </div>
  );
};
