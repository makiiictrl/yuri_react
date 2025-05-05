import React, { useState, useEffect, useRef } from "react";
// import { newRequestSlip } from "../../Helpers/Models";
import { Typeahead } from "react-bootstrap-typeahead";
import ErrorBoundary from "../ErrorBoundary";
import DataTable from "react-data-table-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UseCurrentAgent from "../../Login/UseCurrentAgent";

import {
  employeeNameLookUp,
  customerNameLookUp,
  employeeAutoFilled,
  customerAutoFilled,
  fetchTerritories,
  fetchTeam,
  saveItem,
  showRequestSlip,
  productSampleDescriptionLookUp,
  productPromatsDescriptionLookUp,
  productPackmatsDescriptionLookUp,
  productCommercialDescriptionLookUp,
} from "../../Services/RequestSlipsServices";

export default Form = () => {
  const { agent, loading } = UseCurrentAgent();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [customerOptions, setcustomerOptions] = useState([]);
  const [employeeOptions, setemployeeOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [recommendedByOptions, setRecommendedByOptions] = useState([]);
  const [showOtherOption, setOtherOption] = useState(false);
  const [productSampleDescription, setSampleProductDescription] = useState([]);

  const [productPromatsDescription, setPromatsProductDescription] = useState(
    []
  );
  const [productPackmatsDescription, setPackmatsProductDescription] = useState(
    []
  );
  const [productCommercialDescription, setCommercialProductDescription] =
    useState([]);
  const prepared_by = agent?.email?.split("@")[0] || "";
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef(null);
  const headerTitle = window.location.hash.includes("edit")
    ? "Edit Request Slip"
    : "New Request Slip";
    
  useEffect(() => {
    if (showAlert && alertRef.current) {
      alertRef.current.focus();
    }
  }, [showAlert]);

  const { id } = useParams();

  // To automatically set the routes in rails
  useEffect(() => {
    if (window.location.hash.includes("request_slips/new")) {
      axios
        .get("http://localhost:3000/request_slips/new.json")
        .then((response) => {
          setFormData(response.data);
          setRecommendedByOptions(response.data.recommended_by || {});
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (window.location.hash.includes(`request_slips/edit`)) {
      axios
        .get(`http://localhost:3000/request_slips/edit/${id}.json`)
        .then((response) => {
          setRecommendedByOptions(response.data || {});
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  // For saving
  const handleSave = () => {
    const details = [
      ...sampleRows.map((r) => ({
        id: r.detailId,
        product_code: r.product_code,
        product_description: r.product_description,
        request_quantity: r.request_quantity,
        issue_slip_type: "Sample",
      })),
      ...promatsRows.map((r) => ({
        id: r.detailId,
        product_code: r.product_code,
        product_description: r.product_description,
        request_quantity: r.request_quantity,
        issue_slip_type: "Promats",
      })),
      ...packmatsRows.map((r) => ({
        id: r.detailId,
        product_code: r.product_code,
        product_description: r.product_description,
        request_quantity: r.request_quantity,
        issue_slip_type: "Packmats",
      })),
      ...commercialRows.map((r) => ({
        id: r.detailId,
        product_code: r.product_code,
        product_description: r.product_description,
        request_quantity: r.request_quantity,
        issue_slip_type: "Commercial",
      })),
    ];

    const body = {
      ...data,
      sample_slip_request_details_attributes: details,
    };

    var noRows = false;

    if (details.length === 0) {
      noRows = true;
    }

    const isEditMode = window.location.hash.includes("issue_slips/edit");
    const badDetail = details.find(
      (d) => !d.product_description || !d.request_quantity
    );

    if (
      !data.company_code ||
      !data.type_of_request ||
      !data.customer_name ||
      !data.employee_number ||
      !data.recommended_by ||
      !data.approved_by ||
      !data.endorsed_by ||
      !data.contact_no ||
      (isEditMode && noRows) ||
      (!isEditMode && noRows) ||
      badDetail // <-- or when any row is incomplete
    ) {
      setShowAlert(true);
      // …and immediately focus it, even if already visible
      if (alertRef.current) {
        alertRef.current.focus();
      }
      return;
    }

    setShowAlert(false);

    saveItem(body)
      .then((response) => {
        navigate("/request_slips");
        console.log("saved!");
      })
      .catch((response) => {
        alert("Error");
        console.log(response);
      });

    console.log("Saving:", body);
  };

  // for employee look up
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

  // For existing data fetching for edit
  useEffect(() => {
    // only fetch when we’re on /request_slips/edit/:id
    if (!id) return;

    showRequestSlip(id)
      .then((response) => {
        const requestSlip = response.data;
        console.log(response.data);
        setData(requestSlip);

        if (requestSlip.type_of_request === "Others") {
          setOtherOption(true);
        }

        // Populate each row array based on issue_slip_type
        const details = requestSlip.sample_slip_request_details || [];

        console.log(details);

        setSampleRows(
          details
            .filter((d) => d.issue_slip_type === "Sample")
            .map((d) => ({
              id: Date.now() + Math.random(), // unique id for DataTable row
              detailId: d.id,
              product_code: d.product_code,
              product_description: d.product_description,
              request_quantity: d.request_quantity || d.quantity,
            }))
        );

        setPromatsRows(
          details
            .filter((d) => d.issue_slip_type === "Promats")
            .map((d) => ({
              id: Date.now() + Math.random(),
              detailId: d.id,
              product_code: d.product_code,
              product_description: d.product_description,
              request_quantity: d.request_quantity || d.quantity,
            }))
        );

        setPackmatsRows(
          details
            .filter((d) => d.issue_slip_type === "Packmats")
            .map((d) => ({
              id: Date.now() + Math.random(),
              detailId: d.id,
              product_code: d.product_code,
              product_description: d.product_description,
              request_quantity: d.request_quantity || d.quantity,
            }))
        );

        setCommercialRows(
          details
            .filter((d) => d.issue_slip_type === "Commercial")
            .map((d) => ({
              id: Date.now() + Math.random(),
              detailId: d.id,
              product_code: d.product_code,
              product_description: d.product_description,
              request_quantity: d.request_quantity || d.quantity,
            }))
        );
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, [id]);
  // For product description look up
  useEffect(() => {
    productSampleDescriptionLookUp()
      .then((response) => {
        setSampleProductDescription(response.data);
        console.log("Data fetched successfully", response.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });

    productPromatsDescriptionLookUp()
      .then((response) => {
        setPromatsProductDescription(response.data);
        console.log("Data fetched successfully", response.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });

    productPackmatsDescriptionLookUp()
      .then((response) => {
        setPackmatsProductDescription(response.data);
        console.log("Data fetched successfully", response.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });

    productCommercialDescriptionLookUp()
      .then((response) => {
        setCommercialProductDescription(response.data);
        console.log("Data fetched successfully", response.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  const [sampleRows, setSampleRows] = useState([]);
  const [promatsRows, setPromatsRows] = useState([]);
  const [packmatsRows, setPackmatsRows] = useState([]);
  const [commercialRows, setCommercialRows] = useState([]);

  // 2) Add a blank row
  const handleSampleAddRow = () => {
    setSampleRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        product_description: "",
        request_quantity: "",
        product_code: "",
      },
    ]);
  };

  const handlePromatsAddRow = () => {
    setPromatsRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        product_description: "",
        request_quantity: "",
        product_code: "",
      },
    ]);
  };

  const handlePackmatsAddRow = () => {
    setPackmatsRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        product_description: "",
        request_quantity: "",
        product_code: "",
      },
    ]);
  };

  const handleCommercialAddRow = () => {
    setCommercialRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        product_description: "",
        request_quantity: "",
        product_code: "",
      },
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
      name: (
        <b>
          Product Description <span className="text-danger">*</span>
        </b>
      ),
      width: "50%",
      cell: (row) => (
        <Typeahead
          className="w-100"
          positionFixed
          options={productSampleDescription}
          placeholder="Product Description"
          inputValue={row.product_description || ""}
          selected={row.product_description ? [row.product_description] : []}
          onChange={(selected) =>
            handleSampleRowChange(
              row.id,
              "product_description",
              selected[0] || ""
            )
          }
          onInputChange={(text) =>
            handleSampleRowChange(row.id, "product_description", text)
          }
        />
      ),
    },

    {
      name: <b>Product Code*</b>,
      width: "10%",
      omit: true,
      cell: (row) => (
        <input className="w-100" type="text" value={row.product_code || ""} />
      ),
    },

    {
      name: (
        <b>
          Quantity <span className="text-danger">*</span>
        </b>
      ),
      width: "30%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.request_quantity || ""}
          onChange={(e) =>
            handleSampleRowChange(row.id, "request_quantity", e.target.value)
          }
        />
      ),
    },
    {
      name: <b></b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn-lg"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "1 0px",
          }}
          onClick={() => handleSampleDeleteRow(row.id)}
        >
          <i className="icofont icofont-close text-secondary"></i>
        </button>
      ),
    },
  ];

  const promatsColumns = [
    {
      name: (
        <b>
          Product Description <span className="text-danger">*</span>
        </b>
      ),
      width: "50%",
      cell: (row) => (
        <Typeahead
          className="w-100"
          positionFixed
          options={productPromatsDescription}
          placeholder="Product Description"
          // show the current value as a single-item array
          selected={row.product_description ? [row.product_description] : []}
          onChange={(selected) =>
            handlePromatsRowChange(
              row.id,
              "product_description",
              selected[0] || ""
            )
          }
        />
      ),
    },

    {
      name: <b>Product Code*</b>,
      width: "10%",
      omit: true,
      cell: (row) => (
        <input className="w-100" type="text" value={row.product_code || ""} />
      ),
    },

    {
      name: (
        <b>
          Quantity <span className="text-danger">*</span>
        </b>
      ),
      width: "30%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.request_quantity || ""}
          onChange={(e) =>
            handlePromatsRowChange(row.id, "request_quantity", e.target.value)
          }
        />
      ),
    },
    {
      name: <b></b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn-lg"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "1 0px",
          }}
          onClick={() => handlePromatsDeleteRow(row.id)}
        >
          <i className="icofont icofont-close text-secondary"></i>
        </button>
      ),
    },
  ];

  const packmatsColumns = [
    {
      name: (
        <b>
          Product Description <span className="text-danger">*</span>
        </b>
      ),
      width: "50%",
      cell: (row) => (
        <Typeahead
          className="w-100"
          positionFixed
          options={productPackmatsDescription}
          placeholder="Product Description"
          // show the current value as a single-item array
          selected={row.product_description ? [row.product_description] : []}
          onChange={(selected) =>
            handlePackmatsRowChange(
              row.id,
              "product_description",
              selected[0] || ""
            )
          }
        />
      ),
    },
    {
      name: <b>Product Code*</b>,
      width: "10%",
      omit: true,
      cell: (row) => (
        <input className="w-100" type="text" value={row.product_code || ""} />
      ),
    },
    {
      name: (
        <b>
          Quantity <span className="text-danger">*</span>
        </b>
      ),
      width: "30%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.request_quantity || ""}
          onChange={(e) =>
            handlePackmatsRowChange(row.id, "request_quantity", e.target.value)
          }
        />
      ),
    },
    {
      name: <b></b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn-lg"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "1 0px",
          }}
          onClick={() => handlePackmatsDeleteRow(row.id)}
        >
          <i className="icofont icofont-close text-secondary"></i>
        </button>
      ),
    },
  ];

  const commercialColumns = [
    {
      name: (
        <b>
          Product Description <span className="text-danger">*</span>
        </b>
      ),
      width: "50%",
      cell: (row) => (
        <Typeahead
          className="w-100"
          positionFixed
          options={productCommercialDescription}
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
      name: <b>Product Code*</b>,
      width: "10%",
      omit: true,
      cell: (row) => (
        <input className="w-100" type="text" value={row.product_code || ""} />
      ),
    },
    {
      name: (
        <b>
          Quantity <span className="text-danger">*</span>
        </b>
      ),
      width: "30%",
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={row.request_quantity || ""}
          onChange={(e) =>
            handleCommercialRowChange(
              row.id,
              "request_quantity",
              e.target.value
            )
          }
        />
      ),
    },
    {
      name: <b>Actions</b>,
      width: "10%",
      cell: (row) => (
        <button
          className="btn-lg"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "1 0px",
          }}
          onClick={() => handleCommercialDeleteRow(row.id)}
        >
          <i className="icofont icofont-close text-secondary"></i>
        </button>
      ),
    },
  ];

  return (
    <div className="page-body">
      <div className="card title-line">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <i className="icofont icofont-document-folder me-2 text-dark"></i>
            {headerTitle}
          </h2>
        </div>
        <div className="card-body">
          {showAlert && (
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
                onClick={() => setShowAlert(false)}
              />
            </div>
          )}
          <h5 className="mb-3 border-bottom pb-2">Request Details</h5>
          <div className="row">
            <div className="col-md-3">
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
                <label>
                  Purpose of Request <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="icofont icofont-document-folder"></i>
                  </span>
                  <select
                    className="form-select"
                    required
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
                        setData((prevData) => ({
                          ...prevData,
                          sub_type_of_request: "",
                        }));
                      }
                    }}
                    value={data.type_of_request}
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
                  <label>
                    Others <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="icofont icofont-ebook"></i>
                    </span>

                    <select
                      className="form-select"
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
                <label>
                  Customer <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <Typeahead
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
                <label>
                  Employee Name <span className="text-danger">*</span>
                </label>
                <div className="input-group">
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
                    onChange={(selected) => {
                      setData((prevData) => ({
                        ...prevData,
                        contact_no: selected.target.value,
                      }));
                    }}
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
                    onChange={(selected) => {
                      const request_slip_description = selected.target.value;
                      setData({
                        ...data,
                        request_slip_description: request_slip_description,
                      });
                    }}
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
                    onChange={(selected) => {
                      setData((prevData) => ({
                        ...prevData,
                        address: selected.target.value,
                      }));
                    }}
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
                <label>
                  Recommended by <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <select
                    className="form-select"
                    required
                    value={data.recommended_by}
                    onChange={(selected) => {
                      const recommended_by = selected.target.value;
                      setData({
                        ...data,
                        recommended_by: recommended_by,
                      });
                    }}
                  >
                    <option value="">Please select...</option>
                    {Object.entries(recommendedByOptions).map(([name, id]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>
                  Approved by <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <select
                    className="form-select"
                    required
                    value={data.approved_by}
                    onChange={(selected) => {
                      const approved_by = selected.target.value;
                      setData({
                        ...data,
                        approved_by: approved_by,
                      });
                    }}
                  >
                    <option value="">Please select...</option>
                    <option value="GAN, STEPHEN Y.">GAN, STEPHEN Y.</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group mb-3">
                <label>
                  Endorsed by <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <select
                    className="form-select"
                    required
                    value={data.endorsed_by}
                    onChange={(selected) => {
                      const endorsed_by = selected.target.value;
                      console.log(endorsed_by);

                      setData((prevData) => ({
                        ...prevData,
                        endorsed_by: endorsed_by,
                      }));
                    }}
                  >
                    <option value="">Please select...</option>
                    <option value="GARCIA, ROGELIO JR. MD">
                      GARCIA, ROGELIO JR. MD
                    </option>
                  </select>
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
                    value={loading ? "" : prepared_by}
                  />
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-3 border-bottom pb-2 mt-4">Contact Details</h5>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  Contact Person <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Person"
                    value={data.contact_person}
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
                        noDataComponent="No Records of Sample Request Slip"
                        highlightOnHover
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handleSampleAddRow}
                    >
                      Add Row
                    </button>
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
                        noDataComponent="No Records of Promats Request Slip"
                        highlightOnHover
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handlePromatsAddRow}
                    >
                      Add Row
                    </button>
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
                        noDataComponent="No Records of Packmats Request Slip"
                        highlightOnHover
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handlePackmatsAddRow}
                    >
                      Add Row
                    </button>
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
                        noDataComponent="No Records of Commercial Request Slip"
                        highlightOnHover
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={handleCommercialAddRow}
                    >
                      Add Row
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <Link to="/request_slips" className="btn btn-secondary btn-sm">
              Back
            </Link>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
