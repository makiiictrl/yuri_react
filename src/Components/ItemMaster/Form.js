import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { saveItem } from "../../Services/ItemMastersServices";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Login/ApiLogin";


export default New = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [showItemMasterAlert, setShowItemMasterAlert] = useState(false);
  const alertRef = useRef(null);
  const headerTitle = window.location.hash.includes("edit")
    ? "Edit Item Master"
    : "New Item Master";

  useEffect(() => {
    if (showItemMasterAlert && alertRef.current) {
      alertRef.current.focus();
    }
  }, [showItemMasterAlert]);

  const { id } = useParams();

  const handleSave = () => {

    if (!data.company_code || !data.item_class || !data.unit_of_measure || !data.item_code || !data.old_item_code || !data.team || !data.item_description || !data.pack_size || !data.storage_condition) {
      // always show the alert…
      setShowItemMasterAlert(true);
      // …and immediately focus it, even if already visible
      if (alertRef.current) {
        alertRef.current.focus();
      }
      return;
    }

    setShowItemMasterAlert(false);

    saveItem(data)
      .then((response) => {
        toast.success("Item Master stored successfully.", {
          
          position: "top-right",
          autoClose: 3000,
          icon: (
          
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <circle
                className="checkmark__circle"
                cx="24"
                cy="24"
                r="22"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14 25l7 7 13-13"
              />
            </svg>
          ),
        });
        setTimeout(() => navigate("/item_masters"), 3000);
      })
      .catch((response) => {
        alert("Error");
        console.log(response);
      });

    console.log("Saving:", data);
  };

  useEffect(() => {
    if (window.location.hash.includes("item_masters/edit")) {
      axiosInstance()
        .get(`item_masters/edit/${id}`)
        .then((response) => {
          // TODO: do something with response.data
          setData(response.data.item_master);
          console.log("Loaded Item Master:", response.data.item_master);
        })
        .catch((error) => {
          console.error("Error fetching Item Master:", error);
          alert("Error fetching Item Master");
        });
    }
  }, [id]);

  return (
    <div className="page-body">
      <div className="card title-line">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <i className="icofont icofont-papers me-2 text-dark"></i>
            {headerTitle}
          </h2>
        </div>
        <div className="card-body">
        {showItemMasterAlert && (
            <div
              ref={alertRef}
              tabIndex="-1"
              className="alert alert-light-secondary light alert-dismissible text-dark border-left-wrapper"
              role="alert"
            >
              <i data-feather="help-circle"></i>
              <p>
                Make sure to complete filling up the required (
                <span className="text-danger">*</span>) inputs.
              </p>
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                onClick={() => setShowItemMasterAlert(false)}
              />
            </div>
          )}
          <h5 className="mb-3 border-bottom pb-2">Item Master Details</h5>
          <div className="row mb-2">
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>
                  Company Code <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span>
                  <select
                    className="form-select"
                    required
                    onChange={(selected) => {
                      const company_code = selected.target.value;
                      setData({
                        ...data,
                        company_code: company_code,
                      });
                    }}
                    value={String(data.company_code)}
                  >
                    <option value="">Please select...</option>
                    <option value="1">CDCI</option>
                    <option value="2">YSS</option>
                    <option value="5">CYDC</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>
                  Item Class <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span>
                  <select
                    className="form-select"
                    required
                    onChange={(selected) => {
                      const item_class = selected.target.value;
                      setData({
                        ...data,
                        item_class: item_class,
                      });
                    }}
                    value={data.item_class}
                  >
                    <option value="">Please select...</option>
                    <option value="Sample">Sample</option>
                    <option value="Promats">Promats</option>
                    <option value="Packmats">Packmats</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group mb-3">
                <label>
                  Unit of Measure <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  {/* <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span> */}
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const unit_of_measure = e.target.value;
                      setData({
                        ...data,
                        unit_of_measure: unit_of_measure,
                      });
                    }}
                    value={data.unit_of_measure}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>
                  Item Code <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  {/* <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span> */}
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const item_code = e.target.value;
                      setData({
                        ...data,
                        item_code: item_code,
                      });
                    }}
                    value={data.item_code}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>
                  Old Item Code <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  {/* <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span> */}
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const old_item_code = e.target.value;
                      setData({
                        ...data,
                        old_item_code: old_item_code,
                      });
                    }}
                    value={data.old_item_code}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group mb-3">
                <label>
                  Team <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  {/* <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span> */}
                  <input
                    type="text"
                    className="form-control"
                      onChange={(e) => {
                        const team = e.target.value;
                        setData({
                          ...data,
                          team: team,
                        });
                      }}
                      value={data.team}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>Storage Condition <span className="text-danger">*</span></label>
                <div className="input-group">
                  {/* <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span> */}
                  <textarea
                    type="text"
                    className="form-control"
                    rows={1}
                    onChange={(e) => {
                      const storage_condition = e.target.value;
                      setData({
                        ...data,
                        storage_condition: storage_condition,
                      });
                    }}
                    value={data.storage_condition}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group mb-3">
                <label>
                  Item Description <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  {/* <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span> */}
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const item_description = e.target.value;
                      setData({
                        ...data,
                        item_description: item_description,
                      });
                    }}
                    value={data.item_description}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group mb-3">
                <label>Pack Size <span className="text-danger">*</span></label>
                <div className="input-group">
                  {/* <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span> */}
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const pack_size = e.target.value;
                      setData({
                        ...data,
                        pack_size: pack_size,
                      });
                    }}
                    value={data.pack_size}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <Link to="/item_masters" className="btn btn-secondary btn-sm">
              Back
            </Link>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};
