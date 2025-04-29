import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOAD_COMPANY_CODE_SELECT } from "../../Config/CompanyCodes"; // Import LOAD_COMPANY_CODE_SELECT
import axios from "axios"; // Make sure to import axios
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function InventoryForm() {
  const navigate = useNavigate();

  // State variables
  const [companyCode, setCompanyCode] = useState("");
  const [companyOptions, setCompanyOptions] = useState([]); // Make sure this is initialized as an empty array
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [documentNumbers, setDocumentNumbers] = useState([]); // State for storing document numbers
  const [statusMessage, setStatusMessage] = useState("");

  // Directly use LOAD_COMPANY_CODE_SELECT to populate company options
  useEffect(() => {
    if (Array.isArray(LOAD_COMPANY_CODE_SELECT)) {
      setCompanyOptions(LOAD_COMPANY_CODE_SELECT); // Ensure it's an array
    } else {
      console.error("LOAD_COMPANY_CODE_SELECT is not an array");
    }
  }, []);

  // Fetch document numbers when companyCode or documentType changes
  useEffect(() => {
    if (companyCode && documentType) {
      fetchDocumentNumbers();
    }
  }, [companyCode, documentType]);

  // Function to fetch document numbers
  const fetchDocumentNumbers = async () => {
    try {
      const response = await axios.get("/api/inventories_lookup_document_number", {
        params: { document_type: documentType, company_code: companyCode },
      });
      setDocumentNumbers(response.data);
    } catch (error) {
      console.error("Error fetching document numbers:", error);
    }
  };

  // Handle document number change
  const handleDocumentNumberChange = async (number) => {
    setDocumentNumber(number);
    try {
      const response = await axios.get("/api/inventories_lookup_document_date", {
        params: { document_number: number, document_type: documentType, company_code: companyCode },
      });
      setDocumentDate(response.data.document_date || "");
      fetchInventoryItems(number);
    } catch (error) {
      console.error("Error fetching document details:", error);
      setStatusMessage("Error fetching document details.");
    }
  };

  // Fetch inventory items for selected document number
  const fetchInventoryItems = async (number) => {
    try {
      const response = await axios.get("/api/inventories_lookup_inventory_items", {
        params: { document_number: number, document_type: documentType, company_code: companyCode },
      });
      setInventoryDetails(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      setStatusMessage("Error loading inventory items.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
    console.log("Form submitted with values:", {
      companyCode,
      documentNumber,
      documentType,
      documentDate,
      inventoryDetails,
    });
    navigate("/inventories"); // Navigate back to the inventory page after submission
  };

  return (
    <div className="page-body">
    <div className="col-sm-12">
      <div className="card title-line">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Inventory</h4>
        </div>
        <div className="card-body">
          {statusMessage && <div className="alert alert-danger">{statusMessage}</div>}

          <form onSubmit={handleSubmit}>
            {/* Inventory Header Section */}
            <div className="mb-4">
              <h5 className="mb-3 border-bottom pb-2">Inventory Header</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Company:</label>
                    <select
                      id="inventory_company_code"
                      className="form-select"
                      value={companyCode}
                      onChange={(e) => setCompanyCode(e.target.value)}
                      required
                    >
                      <option value="">Please select...</option>
                      {companyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Warehouse Location:</label>
                    <select
                      id="inventory_type"
                      className="form-select"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      required
                    >
                      <option value="">Please select...</option>
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="SAMPLE">Sample</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Document No.:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={documentNumber}
                      onChange={(e) => handleDocumentNumberChange(e.target.value)}
                      required
                      list="document_numbers_list"
                    />
                    <datalist id="document_numbers_list">
                      {/* Dynamically populate the datalist */}
                      {documentNumbers.map((number, idx) => (
                        <option key={idx} value={number} />
                      ))}
                    </datalist>
                    <span id="documentStatus" className="text-danger"></span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Document Type:</label>
                    <select
                      id="document_type"
                      className="form-select"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      required
                    >
                      <option value="">Please select...</option>
                      <option value="3">Issue Slip</option>
                      <option value="4">Delivery Receipt</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Document Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={documentDate}
                      onChange={(e) => setDocumentDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Items Section */}
            <div className="mb-4">
              <h5 className="mb-3 border-bottom pb-2">Inventory Items</h5>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Product Code</th>
                      <th>Product Description</th>
                      <th>Lot No.</th>
                      <th>Expiry Date</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryDetails.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.product_code}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.product_description}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.lot_number}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="form-control"
                            value={item.expiry_date}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.quantity}
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submit and Back Buttons */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/inventories")}
              >
                Back
              </button>
              <button type="submit" className="btn btn-success">
                Save Inventory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
}
