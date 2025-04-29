import React, { useState, useEffect, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import ErrorBoundary from "../ErrorBoundary";
import DataTable from "react-data-table-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  requestNumberLookUp,
  requestNumberDetailsLookUp,
  requestSlipDetails,
  saveItem,
} from "../../Services/IssueSlipsServices";

import {
  customerNameLookUp,
  customerAutoFilled,
  employeeNameLookUp,
  employeeAutoFilled,
  fetchTerritories,
  fetchTeam,
} from "../../Services/RequestSlipsServices";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default New = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [customerOptions, setcustomerOptions] = useState([]);
  const [employeeOptions, setemployeeOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [recommendedByOptions, setRecommendedByOptions] = useState([]);
  const [showOtherOption, setOtherOption] = useState(false);
  const [requestNumber, setRequestNumber] = useState(false);
  const [productSampleDescription, setSampleProductDescription] = useState([]);
  const [productPromatsDescription, setPromatsProductDescription] = useState(
    []
  );
  const [productPackmatsDescription, setPackmatsProductDescription] = useState(
    []
  );
  const [productCommercialDescription, setCommercialProductDescription] =
    useState([]);

  const [onEdit, setOnEdit] = useState(false);
  const [showRequestNumberAlert, setShowRequestNumberAlert] = useState(false);
  const alertRef = useRef(null);

  const [sampleRows, setSampleRows] = useState([]);
  const [promatsRows, setPromatsRows] = useState([]);
  const [packmatsRows, setPackmatsRows] = useState([]);
  const [commercialRows, setCommercialRows] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (showRequestNumberAlert && alertRef.current) {
      alertRef.current.focus();
    }
  }, [showRequestNumberAlert]);

  // To automatically set the routes in rails
  useEffect(() => {
    if (window.location.hash.includes("issue_slips/new")) {
      axios
        .get("http://localhost:3000/issue_slips/new.json")
        .then((response) => {
          setFormData(response.data);
          setRecommendedByOptions(response.data.recommended_by || {});
          console.log("IS NEW");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (window.location.hash.includes(`issue_slips/edit`)) {
      axios
        .get(`http://localhost:3000/issue_slips/edit/${id}`)
        .then((response) => {
          const payload = response.data;
          // 1) set the "issue_slip" object in state
          setData(payload.issue_slip);
          setOnEdit(true);
          console.log("IS EDIT");
          console.log(payload.issuance_slip_details_sample);

          // 2) pull each detail-array off *the response*, NOT from state
          const sample = payload.issuance_slip_details_sample || [];
          const promats = payload.issuance_slip_details_promats || [];
          const packmats = payload.issuance_slip_details_packmats || [];
          const clinic = payload.issuance_slip_details_clinic || [];

          // 3) now map those into your row-states
          setSampleRows(
            sample.map((d) => ({
              id: Date.now() + Math.random(),
              product_description: d.product_description,
              ordered_quantity: d.ordered_quantity,
              lot_number: d.lot_number,
              expiry_date: d.expiry_date,
              approved_quantity: d.approved_quantity,
            }))
          );
          setPromatsRows(
            promats.map((d) => ({
              id: Date.now() + Math.random(),
              product_description: d.product_description,
              ordered_quantity: d.ordered_quantity,
              lot_number: d.lot_number,
              expiry_date: d.expiry_date,
              approved_quantity: d.approved_quantity,
            }))
          );
          setPackmatsRows(
            packmats.map((d) => ({
              id: Date.now() + Math.random(),
              product_description: d.product_description,
              ordered_quantity: d.ordered_quantity,
              lot_number: d.lot_number,
              expiry_date: d.expiry_date,
              approved_quantity: d.approved_quantity,
            }))
          );
          setCommercialRows(
            clinic.map((d) => ({
              id: Date.now() + Math.random(),
              product_description: d.product_description,
              ordered_quantity: d.ordered_quantity,
              lot_number: d.lot_number,
              expiry_date: d.expiry_date,
              approved_quantity: d.approved_quantity,
            }))
          );

          // 4) and your "Others" toggle
          setOtherOption(payload.issue_slip.type_of_request === "Others");
        })
        .catch(console.error);
    }
  }, [id]);

  // for customer look up
  useEffect(() => {
    customerNameLookUp()
      .then((response) => {
        console.log("Success!");
        console.log(response.data);
        setcustomerOptions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching!");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    employeeNameLookUp()
      .then((response) => {
        console.log("Success!");
        console.log(response.data);
        setemployeeOptions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching!");
        console.error(error);
      });
  }, []);

  // For saving
  const handleSave = () => {
    const details = [
      ...sampleRows.map((r) => ({
        product_description: r.product_description,
        ordered_quantity: r.ordered_quantity,
        lot_number: r.lot_number,
        expiry_date: r.expiry_date,
        approved_quantity: r.approved_quantity,
        request_number: data.request_number,
        request_id: data.request_id,
        issuance_number: data.issuance_number,
        issue_slip_type: "Sample",
      })),
      ...promatsRows.map((r) => ({
        product_description: r.product_description,
        ordered_quantity: r.ordered_quantity,
        lot_number: r.lot_number,
        expiry_date: r.expiry_date,
        approved_quantity: r.approved_quantity,
        request_number: data.request_number,
        issue_slip_type: "Promats",
      })),
      ...packmatsRows.map((r) => ({
        product_description: r.product_description,
        ordered_quantity: r.ordered_quantity,
        lot_number: r.lot_number,
        expiry_date: r.expiry_date,
        approved_quantity: r.approved_quantity,
        request_number: data.request_number,
        issue_slip_type: "Packmats",
      })),
      ...commercialRows.map((r) => ({
        product_description: r.product_description,
        ordered_quantity: r.ordered_quantity,
        lot_number: r.lot_number,
        expiry_date: r.expiry_date,
        approved_quantity: r.approved_quantity,
        request_number: data.request_number,
        issue_slip_type: "Commercial",
      })),
    ];

    const body = {
      ...data,
      sample_slip_issuance_details_attributes: details,
    };

    const badDetail = details.find(
      (d) => !d.approved_quantity || !d.expiry_date || !d.lot_number
    );

    if (!data.request_number || badDetail ) {
      // always show the alert…
      setShowRequestNumberAlert(true);
      // …and immediately focus it, even if already visible
      if (alertRef.current) {
        alertRef.current.focus();
      }
      return;
    }

    setShowRequestNumberAlert(false);

    saveItem({ issue_slip: body })
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
        setTimeout(() => navigate("/issue_slips"), 3000);
        console.log("Saving:", body);
      })
      .catch((response) => {
        alert("Error");
        console.log(response);
      });

    console.log("Saving:", body);
  };

  useEffect(() => {
    requestNumberLookUp()
      .then((response) => {
        console.log("Success! wow");
        console.log(response.data);
        setRequestNumber(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  // 2) Add a blank row
  const handleSampleAddRow = () => {
    setSampleRows((prev) => [
      ...prev,
      { id: Date.now(), product_description: "", request_quantity: "", lot_number: "", expiry_date: "", approved_quantity: "" },
    ]);
  };

  const handlePromatsAddRow = () => {
    setPromatsRows((prev) => [
      ...prev,
      { id: Date.now(), product_description: "", request_quantity: "", lot_number: "", expiry_date: "", approved_quantity: "" },
    ]);
  };

  const handlePackmatsAddRow = () => {
    setPackmatsRows((prev) => [
      ...prev,
      { id: Date.now(), product_description: "", request_quantity: "", lot_number: "", expiry_date: "", approved_quantity: "" },
    ]);
  };

  const handleCommercialAddRow = () => {
    setCommercialRows((prev) => [
      ...prev,
      { id: Date.now(), product_description: "", request_quantity: "", lot_number: "", expiry_date: "", approved_quantity: "" },
    ]);
  };

  // 3) Update a single field on a given row
  const handleSampleRowChange = (id, field, value) => {
    setSampleRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]: value,
            }
          : r
      )
    );
  };

  const handlePromatsRowChange = (id, field, value) => {
    setPromatsRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]: value,
            }
          : r
      )
    );
  };

  const handlePackmatsRowChange = (id, field, value) => {
    setPackmatsRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]: value,
            }
          : r
      )
    );
  };

  const handleCommercialRowChange = (id, field, value) => {
    setCommercialRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]: value,
            }
          : r
      )
    );
  };

  // 4) (Optional) Delete a row
  const handleSampleDeleteRow = (id) => {
    setSampleRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handlePromatsDeleteRow = (id) => {
    setPromatsRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handlePackmatsDeleteRow = (id) => {
    setPackmatsRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCommercialDeleteRow = (id) => {
    setCommercialRows((prev) => prev.filter((r) => r.id !== id));
  };

  // 5) Build your columns to read/write from `rows`
  const sampleColumns = [
    {
      name: <b>Product Description</b>,
      width: "30%",
      cell: (row) => (
        // <Typeahead
        //   className="w-100"
        //   positionFixed
        //   options={productSampleDescription}
        //   placeholder="Product Description"
        //   // show the current value as a single-item array
        //   selected={row.product_description ? [row.product_description] : []}
        //   onChange={(selected) =>
        //     handleSampleRowChange(
        //       row.id,
        //       "product_description",
        //       selected[0] || ""
        //     )
        //   }
        // />
        <input
          type="text"
          className="form-control"
          placeholder="Product Description"
          value={row.product_description || ""}
          //   onChange={(e) =>
          //     handleSampleRowChange(
          //       row.id,
          //       "product_description",
          //       e.target.value
          //     )
          //   }
          readOnly
        />
      ),
    },
    {
      name: <b>Quantity</b>,
      width: "10%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.ordered_quantity || ""}
          //   onChange={(e) =>
          //     handleSampleRowChange(row.id, "request_quantity", e.target.value)
          //   }
          readOnly
        />
      ),
    },
    {
      name: <b>Lot Number <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Lot Number"
          value={row.lot_number || ""}
            onChange={(e) =>
              handleSampleRowChange(row.id, "lot_number", e.target.value)
            }
        />
      ),
    },
    {
      name: <b>Expiry Date <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="date"
          className="form-control"
          placeholder="Expiry Date"
          value={row.expiry_date || ""}
            onChange={(e) =>
              handleSampleRowChange(row.id, "expiry_date", e.target.value)
            }
          
        />
      ),
    },
    {
      name: <b>Approved Quantity <span className="text-danger">*</span></b>,
      width: "20%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Approved Quantity"
          value={row.approved_quantity || ""}
            onChange={(e) =>
              handleSampleRowChange(row.id, "approved_quantity", e.target.value)
            }
        
        />
      ),
    },
    {
      name: <b>Actions</b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleSampleDeleteRow(row.id)}
        >
          <i className="icon-trash text-white icon-xl"></i>
        </button>
      ),
    },
  ];

  const promatsColumns = [
    {
      name: <b>Product Description</b>,
      width: "30%",
      cell: (row) => (
        // <Typeahead
        //   className="w-100"
        //   positionFixed
        //   options={productSampleDescription}
        //   placeholder="Product Description"
        //   // show the current value as a single-item array
        //   selected={row.product_description ? [row.product_description] : []}
        //   onChange={(selected) =>
        //     handlePromatsRowChange(
        //       row.id,
        //       "product_description",
        //       selected[0] || ""
        //     )
        //   }
        // />

        <input
          type="text"
          className="form-control"
          placeholder="Product Description"
          value={row.product_description || ""}
          //   onChange={(e) =>
          //     handlePromatsRowChange(
          //       row.id,
          //       "product_description",
          //       e.target.value
          //     )
          //   }
          readOnly
        />
      ),
    },
    {
      name: <b>Quantity</b>,
      width: "10%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.ordered_quantity || ""}
          onChange={(e) =>
            handlePromatsRowChange(row.id, "ordered_quantity", e.target.value)
          }
        />
      ),
    },
    {
      name: <b>Lot Number <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Lot Number"
          value={row.lot_number || ""}
            onChange={(e) =>
              handlePromatsRowChange(row.id, "lot_number", e.target.value)
            }
        />
      ),
    },
    {
      name: <b>Expiry Date <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="date"
          className="form-control"
          placeholder="Expiry Date"
          value={row.expiry_date || ""}
            onChange={(e) =>
              handlePromatsRowChange(row.id, "expiry_date", e.target.value)
            }
          
        />
      ),
    },
    {
      name: <b>Approved Quantity <span className="text-danger">*</span></b>,
      width: "20%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Approved Quantity"
          value={row.approved_quantity || ""}
            onChange={(e) =>
              handlePromatsRowChange(row.id, "approved_quantity", e.target.value)
            }
        
        />
      ),
    },
    {
      name: <b>Actions</b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handlePromatsDeleteRow(row.id)}
        >
          <i className="icon-trash text-white icon-xl"></i>
        </button>
      ),
    },
  ];

  const packmatsColumns = [
    {
      name: <b>Product Description</b>,
      width: "30%",
      cell: (row) => (
        // <Typeahead
        //   className="w-100"
        //   positionFixed
        //   options={productSampleDescription}
        //   placeholder="Product Description"
        //   // show the current value as a single-item array
        //   selected={row.product_description ? [row.product_description] : []}
        //   onChange={(selected) =>
        //     handlePackmatsRowChange(
        //       row.id,
        //       "product_description",
        //       selected[0] || ""
        //     )
        //   }
        // />

        <input
          type="text"
          className="form-control"
          placeholder="Product Description"
          value={row.product_description || ""}
          //   onChange={(e) =>
          //     handlePromatsRowChange(
          //       row.id,
          //       "product_description",
          //       e.target.value
          //     )
          //   }
          readOnly
        />
      ),
    },
    {
      name: <b>Quantity</b>,
      width: "10%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.ordered_quantity || ""}
          onChange={(e) =>
            handlePackmatsRowChange(row.id, "ordered_quantity", e.target.value)
          }
          readOnly
        />
      ),
    },
    {
      name: <b>Lot Number <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Lot Number"
          value={row.lot_number || ""}
            onChange={(e) =>
              handlePackmatsRowChange(row.id, "lot_number", e.target.value)
            }
        />
      ),
    },
    {
      name: <b>Expiry Date <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="date"
          className="form-control"
          placeholder="Expiry Date"
          value={row.expiry_date || ""}
            onChange={(e) =>
              handlePackmatsRowChange(row.id, "expiry_date", e.target.value)
            }
          
        />
      ),
    },
    {
      name: <b>Approved Quantity <span className="text-danger">*</span></b>,
      width: "20%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Approved Quantity"
          value={row.approved_quantity || ""}
            onChange={(e) =>
              handlePackmatsRowChange(row.id, "approved_quantity", e.target.value)
            }
        
        />
      ),
    },
    {
      name: <b>Actions</b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handlePackmatsDeleteRow(row.id)}
        >
          <i className="icon-trash text-white icon-xl"></i>
        </button>
      ),
    },
  ];

  const commercialColumns = [
    {
      name: <b>Product Description</b>,
      width: "30%",
      cell: (row) => (
        <Typeahead
          className="w-100"
          positionFixed
          options={productSampleDescription}
          placeholder="Product Description"
          // show the current value as a single-item array
          selected={row.product_description ? [row.product_description] : []}
          onChange={(selected) =>
            handleCommercialRowChange(
              row.id,
              "product_description",
              selected[0] || ""
            )
          }
        />
      ),
    },
    {
      name: <b>Quantity</b>,
      width: "10%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.ordered_quantity || ""}
          onChange={(e) =>
            handleCommercialRowChange(
              row.id,
              "ordered_quantity",
              e.target.value
            )
          }
        />
      ),
    },
    {
      name: <b>Lot Number <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Lot Number"
          value={row.lot_number || ""}
            onChange={(e) =>
              handleCommercialRowChange(row.id, "lot_number", e.target.value)
            }
        />
      ),
    },
    {
      name: <b>Expiry Date <span className="text-danger">*</span></b>,
      width: "15%",
      cell: (row) => (
        <input
          type="date"
          className="form-control"
          placeholder="Expiry Date"
          value={row.expiry_date || ""}
            onChange={(e) =>
              handleCommercialRowChange(row.id, "expiry_date", e.target.value)
            }
          
        />
      ),
    },
    {
      name: <b>Approved Quantity <span className="text-danger">*</span></b>,
      width: "20%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Approved Quantity"
          value={row.approved_quantity || ""}
            onChange={(e) =>
              handleCommercialRowChange(row.id, "approved_quantity", e.target.value)
            }
        
        />
      ),
    },
    {
      name: <b>Actions</b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleCommercialDeleteRow(row.id)}
        >
          <i className="icon-trash text-white icon-xl"></i>
        </button>
      ),
    },
  ];

  return (
    <div className="page-body">
      <div className="card title-line">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <i className="icofont icofont-paper me-2 text-dark"></i>
            Issue Slip
          </h2>
        </div>
        <div className="card-body">
          {showRequestNumberAlert && (
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
          <h5 className="mb-3 border-bottom pb-2">Issue Details</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  Request Number <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  {!onEdit ? (
                    <Typeahead
                      className="w-100"
                      placeholder="Request Number"
                      options={requestNumber}
                      selected={
                        data.request_number ? [`${data.request_number}`] : []
                      }
                      onChange={(selected) => {
                        const request_number = selected[0] || "";
                        setData((prevData) => ({
                          ...prevData,
                          request_number,
                        }));
                        console.log(request_number);

                        requestNumberDetailsLookUp(request_number)
                          .then((response) => {
                            console.log("Success! wow");
                            console.log(response.data);
                            setData((prevData) => ({
                              ...prevData,
                              request_id: response.data.id,
                              slip_request_id: response.data.id,
                              request_number: response.data.request_number,
                              request_slip_description:
                                response.data.request_slip_description,
                              customer_number: response.data.customer_code,
                              customer_name: response.data.customer_name,
                              deliver_to: response.data.customer_name,
                              company_code: response.data.company_code,
                              type_of_request: response.data.type_of_request,
                              sub_type_of_request:
                                response.data.sub_type_of_request,
                              address: response.data.address,
                              contact_person: response.data.contact_person,
                              contact_no: response.data.contact_no,
                              employee_number: response.data.employee_number,
                              employee_name: response.data.employee_name,
                              prepared_by: response.data.prepared_by,
                              prepared_date: response.data.prepared_date,
                              recommended_by: response.data.recommended_by,
                              approved_by: response.data.approved_by,
                              endorsed_by: response.data.endorsed_by,
                              designation: response.data.designation,
                              territory_code: response.data.territory_code,
                              team: response.data.team,
                            }));

                            requestSlipDetails(response.data.id)
                              .then((response) => {
                                console.log("Success! wow details yarn");
                                console.log(response.data);

                                // Populate each row array based on issue_slip_type
                                const details =
                                  response.data.request_details || [];

                                console.log(details);

                                setSampleRows(
                                  details
                                    .filter(
                                      (d) => d.issue_slip_type === "Sample"
                                    )
                                    .map((d) => ({
                                      id: Date.now() + Math.random(), // unique id for DataTable row
                                      product_description:
                                        d.product_description,
                                      ordered_quantity:
                                        d.request_quantity || d.quantity,
                                    }))
                                );

                                setPromatsRows(
                                  details
                                    .filter(
                                      (d) => d.issue_slip_type === "Promats"
                                    )
                                    .map((d) => ({
                                      id: Date.now() + Math.random(),
                                      product_description:
                                        d.product_description,
                                        ordered_quantity:
                                        d.request_quantity || d.quantity,
                                    }))
                                );

                                setPackmatsRows(
                                  details
                                    .filter(
                                      (d) => d.issue_slip_type === "Packmats"
                                    )
                                    .map((d) => ({
                                      id: Date.now() + Math.random(),
                                      product_description:
                                        d.product_description,
                                        ordered_quantity:
                                        d.request_quantity || d.quantity,
                                    }))
                                );

                                setCommercialRows(
                                  details
                                    .filter(
                                      (d) => d.issue_slip_type === "Commercial"
                                    )
                                    .map((d) => ({
                                      id: Date.now() + Math.random(),
                                      product_description:
                                        d.product_description,
                                      ordered_quantity:
                                        d.request_quantity || d.quantity,
                                    }))
                                );
                              })
                              .catch((err) => {
                                console.error("Error fetching data", err);
                              });

                            if (response.data.type_of_request === "Others") {
                              setOtherOption(true);
                            } else {
                              setOtherOption(false);
                            }
                          })
                          .catch((err) => {
                            console.error("Error fetching data", err);
                          });
                      }}
                    />
                  ) : (
                    <input
                      className="form-control"
                      type="text"
                      value={data.request_number}
                      readOnly
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Request Date</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="date"
                    value={data.prepared_date}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Company Code</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-building-alt"></i>
                  </span>
                  <select
                    className="form-select"
                    type="text"
                    placeholder="Company Code"
                    required
                    // onChange={(selected) => {
                    //   const company_code = selected.target.value;
                    //   setData({
                    //     ...data,
                    //     company_code: company_code,
                    //   });
                    // }}
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

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Purpose of Request</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-document-folder"></i>
                  </span>
                  <select
                    type="text"
                    className="form-select"
                    // required
                    onChange={(selected) => {
                      const type_of_request = selected.target.value;
                      setData({
                        ...data,
                        type_of_request: type_of_request,
                      });

                      if (selected.target.value == "Others") {
                        setOtherOption(true);
                      } else {
                        setOtherOption(false);
                        setData((prev) => ({
                          ...prev,
                          sub_type_of_request: "",
                        }));
                      }
                    }}
                    value={data.type_of_request}
                    placeholder="Purpose of Request"
                  >
                    <option value="" selected>
                      Please select...
                    </option>
                    <option value="Stock for Accreditation">
                      Stock for Accreditation
                    </option>
                    <option value="MD Starter Dose/Sampling">
                      MD Starter Dose/Sampling
                    </option>
                    <option value="Free Clinic">Free Clinic</option>
                    <option value="Medical Mission">Medical Mission</option>
                    <option value="Booth Convention/Post Grad">
                      Booth Convention/Post Grad
                    </option>
                    <option value="Additional Sample Allocation">
                      Additional Sample Allocation
                    </option>
                    <option value="MD Personal Use">MD Personal Use</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              {showOtherOption == true && (
                <div className="form-group mb-3">
                  <label>Others</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="icofont icofont-ebook"></i>
                    </span>

                    <select
                      className="form-select"
                      type="text"
                      onChange={(selected) => {
                        const sub_type_of_request = selected.target.value;
                        setData({
                          ...data,
                          sub_type_of_request: sub_type_of_request,
                        });
                      }}
                      value={data.sub_type_of_request}
                      required={showOtherOption ? true : false}
                    >
                      <option value="" selected>
                        Please select...
                      </option>
                      <option value="Personal Use">Personal Use</option>
                      <option value="Clinic Office Use">
                        Clinic Office Use
                      </option>
                      <option value="Monthly Sample Allocation Use">
                        Monthly Sample Allocation Use
                      </option>
                      <option value="FDA Compliance">FDA Compliance</option>
                      <option value="Replacement">Replacement</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Customer</label>
                <div className="input-group">
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Customer Name"
                    value={data.customer_name}
                    
                  /> */}
                  <Typeahead
                    allowNew={false}
                    options={customerOptions}
                    className="w-100"
                    placeholder="Customer Name"
                    selected={
                      data.customer_name ? [`${data.customer_name}`] : []
                    }
                    onChange={(selected) => {
                      `    `;
                      if (selected.length > 0) {
                        // Split the selected option into parts
                        const parts = selected[0].split(" - ");
                        const customerId = parts[0]; // Numeric ID
                        const customerName = parts[1]; // Display name

                        // Update state with customer_id and customer_name using functional update
                        setData((prevData) => ({
                          ...prevData,
                          customer_code: customerId,
                          customer_name: customerName,
                        }));
                        console.log(customerName);

                        // Call the customerAutoFilled API
                        customerAutoFilled(customerId)
                          .then((response) => {
                            console.log("API call successful");
                            console.log(response.data);
                            const { billing_address } = response.data;

                            // Build full address string by combining parts if they exist
                            const fullAddress = [
                              billing_address.address_1,
                              billing_address.address_2,
                              billing_address.address_3,
                              billing_address.address_4,
                              billing_address.address_5,
                            ]
                              .filter((part) => part && part.trim() !== "")
                              .join(", ");

                            // Update state with address, preserving previous updates using functional update
                            setData((prevData) => ({
                              ...prevData,
                              address: fullAddress,
                            }));
                          })
                          .catch((error) => {
                            alert(
                              "Error occurred while autofilling customer data"
                            );
                            console.error(error);
                          });
                      }
                    }}
                    onInputChange={(input) => {
                      const parts = input.split(" - ");
                      const customer_code = parts[0];
                      const customer_name = parts.slice(1).join(" - ") || "";
                      setData({
                        ...data,
                        customer_code: customer_code,
                        customer_name: customer_name,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Employee Name</label>
                <div className="input-group">
                  {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Employee Name"
                    value={data.employee_name}
                    
                  /> */}
                  <Typeahead
                    allowNew={false}
                    options={employeeOptions}
                    className="w-100"
                    placeholder="Employee Name"
                    selected={
                      data.employee_name ? [`${data.employee_name}`] : []
                    }
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        // Split the selected value into employee id and name.
                        const selectedValue = selected[0].split(" - ");
                        const employeeId = selectedValue[0]; // Extract the number (ID)
                        const employeeName = selectedValue[1]; // Extract the name
                        console.log(employeeName);
                        console.log(employeeId);

                        employeeAutoFilled(employeeId)
                          .then((response) => {
                            console.log("success! wow");
                            console.log(response.data.infotxt_mpn);
                            console.log(response.data);

                            // Update state using the functional form to ensure the latest state is used.
                            setData((prevData) => ({
                              ...prevData,
                              contact_no: response.data.infotxt_mpn,
                              contact_person: response.data.employee_name,
                              designation: response.data.position,
                              employee_number: response.data.employee_number,
                              employee_name: response.data.employee_name,
                            }));

                            fetchTerritories(response.data.employee_number)
                              .then((result) => {
                                console.log("success! wow1111");
                                setData((prevData) => ({
                                  ...prevData,
                                  territory_code: result.data,
                                }));

                                fetchTeam(response.data.employee_number)
                                  .then((output) => {
                                    console.log("success! wow1111222");
                                    console.log(output.data);
                                    setData((prevData) => ({
                                      ...prevData,
                                      team: output.data,
                                    }));
                                  })
                                  .catch((error) => {
                                    alert("Error fetching territories");
                                    console.log(error);
                                  });
                              })
                              .catch((error) => {
                                alert("Error fetching territories");
                                console.log(error);
                              });
                          })
                          .catch((error) => {
                            alert("Error fetching employee details");
                            console.log(error);
                          });
                      }
                    }}
                    onInputChange={(input) => {
                      const parts = input.split(" - ");
                      const customer_code = parts[0];
                      const customer_name = parts.slice(1).join(" - ") || "";
                      setData({
                        ...data,
                        employee_number: customer_code,
                        employee_name: customer_name,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Contact No.</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Contact No."
                    // onChange={(selected) => {
                    //   setData((prevData) => ({
                    //     ...prevData,
                    //     contact_no: selected.target.value,
                    //   }));
                    // }}
                    readOnly
                    value={data.contact_no}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Request Description</label>
                <div className="input-group">
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Request Description"
                    rows={1}
                    // onChange={(selected) => {
                    //   const request_slip_description = selected.target.value;
                    //   setData({
                    //     ...data,
                    //     request_slip_description: request_slip_description,
                    //   });
                    // }}
                    readOnly
                    value={data.request_slip_description}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Address</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                    // onChange={(selected) => {
                    //   setData((prevData) => ({
                    //     ...prevData,
                    //     address: selected.target.value,
                    //   }));
                    // }}
                    readOnly
                    value={data.address}
                  />
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-3 border-bottom pb-2 mt-4">Approval Details</h5>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Recommended by</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    required
                    value={data.recommended_by}
                    readOnly
                    // onChange={(selected) => {
                    //   const recommended_by = selected.target.value;
                    //   setData({
                    //     ...data,
                    //     recommended_by: recommended_by,
                    //   });
                    // }}
                  />
                  {/* <option value="">Please select...</option>
                    {Object.entries(recommendedByOptions).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select> */}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Approved by</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    required
                    value={data.approved_by}
                    // onChange={(selected) => {
                    //   const approved_by = selected.target.value;
                    //   setData({
                    //     ...data,
                    //     approved_by: approved_by,
                    //   });
                    // }}
                    readOnly
                  />
                  {/* <option value="">Please select...</option>
                    <option value="GAN, STEPHEN Y.">GAN, STEPHEN Y.</option>
                  </select> */}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Endorsed by</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    required
                    value={data.endorsed_by}
                    // onChange={(selected) => {
                    //   const endorsed_by = selected.target.value;
                    //   console.log(endorsed_by);

                    //   setData((prevData) => ({
                    //     ...prevData,
                    //     endorsed_by: endorsed_by,
                    //   }));
                    // }}
                    readOnly
                  />
                  {/* <option value="">Please select...</option>
                    <option value="GARCIA, ROGELIO JR. MD">
                      GARCIA, ROGELIO JR. MD
                    </option>
                  </select> */}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>Prepared by</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="name"
                    readOnly
                    value={data.prepared_by}
                    // onBlur={(selected) => {
                    //   const prepared_by = selected.target.value;
                    //   setData({
                    //     ...data,
                    //     prepared_by: prepared_by,
                    //   });
                    // }}
                  />
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-3 border-bottom pb-2 mt-4">Contact Details</h5>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Contact Person</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Person"
                    value={data.contact_person}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Designation</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Designation"
                    value={data.designation}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-4 border-bottom pb-2 mt-4">Product Details</h5>

          <div className="horizontal-wizard-wrapper">
            <div className="row g-3">
              <div className="col-12 main-horizontal-header">
                <div
                  className="nav nav-pills horizontal-options"
                  id="horizontal-wizard-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {/* Sample Tab */}
                  <a
                    className="nav-link active"
                    id="sample-tab"
                    data-bs-toggle="pill"
                    href="#sample-info"
                    role="tab"
                    aria-controls="sample-info"
                    aria-selected="true"
                  >
                    <div className="horizontal-wizard">
                      <div className="stroke-icon-wizard">
                        <i className="icofont icofont-pills"></i>
                      </div>
                      <div className="horizontal-wizard-content">
                        <h6>Sample</h6>
                      </div>
                    </div>
                  </a>

                  {/* Promats Tab */}
                  <a
                    className="nav-link"
                    id="promats-tab"
                    data-bs-toggle="pill"
                    href="#promats-info"
                    role="tab"
                    aria-controls="promats-info"
                    aria-selected="false"
                  >
                    <div className="horizontal-wizard">
                      <div className="stroke-icon-wizard">
                        <i className="icofont icofont-clip"></i>
                      </div>
                      <div className="horizontal-wizard-content">
                        <h6>Promats</h6>
                      </div>
                    </div>
                  </a>

                  {/* Packmats Tab */}
                  <a
                    className="nav-link"
                    id="packmats-tab"
                    data-bs-toggle="pill"
                    href="#packmats-info"
                    role="tab"
                    aria-controls="packmats-info"
                    aria-selected="false"
                  >
                    <div className="horizontal-wizard">
                      <div className="stroke-icon-wizard">
                        <i className="icofont icofont-package"></i>
                      </div>
                      <div className="horizontal-wizard-content">
                        <h6>Packmats</h6>
                      </div>
                    </div>
                  </a>

                  {/* Commercial Tab */}
                  <a
                    className="nav-link"
                    id="commercial-tab"
                    data-bs-toggle="pill"
                    href="#commercial-info"
                    role="tab"
                    aria-controls="commercial-info"
                    aria-selected="false"
                  >
                    <div className="horizontal-wizard">
                      <div className="stroke-icon-wizard">
                        <i className="icofont icofont-medical-sign-alt"></i>
                      </div>
                      <div className="horizontal-wizard-content">
                        <h6>Commercial</h6>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-12">
                <div
                  className="tab-content dark-field"
                  id="horizontal-wizard-tabContent"
                >
                  {/* Sample Tab Content */}
                  <div
                    className="tab-pane fade show active"
                    id="sample-info"
                    role="tabpanel"
                    aria-labelledby="sample-tab"
                  >
                    <div className="row">
                      <DataTable
                        columns={sampleColumns}
                        data={sampleRows}
                        responsive
                        striped
                        bordered
                        noDataComponent="No Records of Agent User Menu"
                        highlightOnHover
                      />
                    </div>
                    {/* <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handleSampleAddRow}
                    >
                      Add Row
                    </button> */}
                  </div>

                  {/* Promats Tab Content */}
                  <div
                    className="tab-pane fade"
                    id="promats-info"
                    role="tabpanel"
                    aria-labelledby="promats-tab"
                  >
                    <div className="row">
                      <DataTable
                        columns={promatsColumns}
                        data={promatsRows}
                        responsive
                        striped
                        bordered
                        noDataComponent="No Records of Agent User Menu"
                        highlightOnHover
                      />
                    </div>
                    {/* <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handlePromatsAddRow}
                    >
                      Add Row
                    </button> */}
                  </div>

                  {/* Packmats Tab Content */}
                  <div
                    className="tab-pane fade"
                    id="packmats-info"
                    role="tabpanel"
                    aria-labelledby="packmats-tab"
                  >
                    <div className="row">
                      <DataTable
                        columns={packmatsColumns}
                        data={packmatsRows}
                        responsive
                        striped
                        bordered
                        noDataComponent="No Records of Agent User Menu"
                        highlightOnHover
                      />
                    </div>
                    {/* <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handlePackmatsAddRow}
                    >
                      Add Row
                    </button> */}
                  </div>

                  {/* Commercial Tab Content */}
                  <div
                    className="tab-pane fade"
                    id="commercial-info"
                    role="tabpanel"
                    aria-labelledby="commercial-tab"
                  >
                    <div className="row">
                      <DataTable
                        columns={commercialColumns}
                        data={commercialRows}
                        responsive
                        striped
                        bordered
                        noDataComponent="No Records of Agent User Menu"
                        highlightOnHover
                      />
                    </div>
                    {/* <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handleCommercialAddRow}
                    >
                      Add Row
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <Link to="/issue_slips" className="btn btn-secondary btn-sm">
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
