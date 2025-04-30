import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import DataTable from "react-data-table-component";

import { LOAD_COMPANY_CODE_SELECT } from "../../Config/CompanyCodes";
import {
  saveTransferSlips,
  documentNumberLookUp,
  inventoryDetailsLookUp,
  documentDateLookUp,
  inventoryItemDetailsLookup,
} from "../../Services/InventoriesServices";
import {} from "../../Services/InventoyListingsServices";

export default function InventoryForm() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [showInventoryAlert, setShowInventoryAlert] = useState(false);
  const alertRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [documentNumbers, setDocumentNumber] = useState(false);
  const [inventoryDetails, setInventoryDetails] = useState([]);

  const columns = [
    {
      name: "Product Code",
      selector: (row) => row.product_code,
      sortable: true,
      width: "15%",
    },
    {
      name: "Product Description",
      selector: (row) => row.product_description,
      sortable: true,
      width: "50%",
    },
    {
      name: "Lot No.",
      selector: (row) => row.lot_number,
      sortable: true,
      width: "10%",
    },
    {
      name: "Expiry Date",
      selector: (row) => row.expiry_date,
      sortable: true,
      width: "15%",
    },
    {
      name: "Quantity",
      selector: (row) => row.received_quantity,
      sortable: true,
      width: "10%",
    },
  ];

  // useEffect(() => {
  //   if (window.location.hash.includes(`issue_slips/edit`)) {
  //     axios
  //       .get(`http://localhost:3000/issue_slips/edit/${id}`)
  //       .then((response) => {
  //         const payload = response.data;
  //         // 1) set the "issue_slip" object in state
  //         setData(payload.issue_slip);
  //         setOnEdit(true);
  //         console.log("IS EDIT");
  //         console.log(payload.issuance_slip_details_sample);

  //         // 2) pull each detail-array off *the response*, NOT from state
  //         const sample = payload.issuance_slip_details_sample || [];

  //         // 3) now map those into your row-states
  //         setSampleRows(
  //           sample.map((d) => ({
  //             id: Date.now() + Math.random(),
  //             product_description: d.product_description,
  //             ordered_quantity: d.ordered_quantity,
  //             lot_number: d.lot_number,
  //             expiry_date: d.expiry_date,
  //             approved_quantity: d.approved_quantity,
  //           }))
  //         );
  //         })
  //       .catch(console.error);
  //   }
  // }, [id]);

  useEffect(() => {
    if (showInventoryAlert && alertRef.current) {
      alertRef.current.focus();
    }
  }, [showInventoryAlert]);

  useEffect(() => {
    documentNumberLookUp()
      .then((response) => {
        console.log("Success! wow");
        console.log(response.data);
        setDocumentNumber(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  const handleSave = () => {
    // const body = {
    //   ...data,
    //   inventory_details: details,
    // };

    saveTransferSlips(data)
      .then((response) => {
        toast.success("Issue slip stored successfully.", {
          // you can tweak these options
          position: "top-right",
          autoClose: 3000,
          icon: (
            // any JSX goes here!
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
        setTimeout(() => navigate("/inventory_listings"), 3000);
        console.log("Saving:", body);
      })
      .catch((response) => {
        alert("Error");
        console.log(response);
      });

    console.log("Saving:", body);
  };
  
  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <i className="icofont icofont-mail me-2 text-dark"></i>
              Inventory
            </h2>
          </div>
          <div className="card-body">
            {showInventoryAlert && (
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
                  onClick={() => setShowRequestNumberAlert(false)}
                />
              </div>
            )}

            {/* Inventory Header Section */}
            <div className="mb-4">
              <h5 className="mb-3 border-bottom pb-2">Inventory Details</h5>
              <div className="row">
                <div className="col-md-6">
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
                        value={data.company_code}
                        disabled={isDisabled}
                      >
                        <option value="">Please select...</option>
                        <option value="1">CDCI</option>
                        <option value="2">YSS</option>
                        <option value="5">CYDC</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Warehouse Location:</label>
                    <select
                      id="inventory_type"
                      className="form-select"
                      // value={documentType}
                      // onChange={(e) => setDocumentType(e.target.value)}
                      required
                    >
                      <option value="">Please select...</option>
                      <option value="IN-PROGRESS">IN-PROGRESS</option>
                      <option value="QUARANTINE">QUARANTINE</option>
                      <option value="COMMERCIAL">COMMERCIAL</option>
                      <option value="SAMPLE">SAMPLE</option>
                      <option value="SUB WAREHOUSE">SUB WARHOUSE</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Document No.</label>
                    <Typeahead
                      allowNew={false}
                      className="w-100"
                      placeholder="Document No."
                      options={documentNumbers}
                      onChange={(selected) => {
                        if (selected.length === 0) {
                          setIsDisabled(false);
                          setData((prev) => ({
                            ...prev,
                            document_number: "",
                            document_type: "",
                            document_date: "",
                            company_code: "",
                          }));
                          setInventoryDetails([]);
                          return;
                        }

                        const documentNumber = selected[0];

                        setData((prevData) => ({
                          ...prevData,
                          document_number: documentNumber,
                        }));

                        inventoryDetailsLookUp(documentNumber)
                          .then(({ data }) => {
                            console.log(data);
                            setData((prevData) => ({
                              ...prevData,
                              company_code: data.company_code,
                              document_type: data.document_type,
                            }));

                            documentDateLookUp(
                              data.document_type,
                              documentNumber,
                              data.company_code
                            ).then((response) => {
                              console.log(response.data); // → { document_date: "…" }
                              console.log(response.data.document_date);
                              setData((prev) => ({
                                ...prev,
                                document_date: response.data.document_date,
                              }));
                            });

                            inventoryItemDetailsLookup(
                              data.document_type,
                              documentNumber,
                              data.company_code
                            )
                              .then((response) => {
                                console.log("sumakses");
                                console.log(response.data); // → { document_date: "…" }
                                setInventoryDetails(response.data);
                                console.log(inventoryDetails);
                              })
                              .catch((error) => {
                                console.error(
                                  "Error fetching inventory details:",
                                  error
                                );
                              });

                            setIsDisabled(true);
                          })
                          .catch((error) => {
                            console.error(
                              "Error fetching inventory details:",
                              error
                            );
                          });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Document Type:</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="icofont icofont-document-folder"></i>
                      </span>
                      <select
                        className="form-select"
                        value={data.document_type}
                        disabled={isDisabled}
                      >
                        <option value="">Please select...</option>
                        <option value="3">Issue Slip</option>
                        <option value="6">Transfer Slip</option>
                        <option value="7">WRR</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Document Date:</label>
                    <input
                      className="form-control"
                      type="date"
                      value={data.document_date}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <h5 className="mb-3 border-bottom pb-2">Item Details</h5>
              <DataTable
                columns={columns}
                data={inventoryDetails}
                responsive
                striped
                bordered
                noDataComponent="No Records of Agent User Menu"
                highlightOnHover
              />
            </div>

            {/* Submit and Back Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate("/inventory_listings")}
              >
                Back
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
