// File: src/components/TransferSlipForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { saveTransferSlips } from "../../Services/TransferSlipsServices";
import {
  fetchWarehousePersonnels,
  fetchLotNumberOptions,
  fetchProductDescriptionOptions,
  fetchProductByLot,
  fetchDatesByLotAndSku,
  fetchNextSlipNumbers,
} from "../../Services/TransferSlipsServices";
import { LOAD_COMPANY_CODE_SELECT } from "../../Config/CompanyCodes";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function TransferSlipForm() {
  const navigate = useNavigate();

  // Header state
  const [header, setHeader] = useState({
    companyCode: "",
    transferSlipNumber: "",
    transferTo: "",
    receivedBy: "",
    transferSlipType: "",
    transferSlipTypeOther: "",
    transferredBy: "",
    transferredByDate: "",
    receivedDate: "",
  });

  // Detail rows for DataTable
  const [detailRows, setDetailRows] = useState([]);

  // Lookup options & next‑slip numbers
  const [lotNumberOptions, setLotNumberOptions] = useState([]);
  const [productDescriptionOptions, setProductDescriptionOptions] = useState([]);
  const [personnels, setPersonnels] = useState({});
  const [nextSlipNumbers, setNextSlipNumbers] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Build Typeahead lists
  const companyOptions = useMemo(
    () =>
      Object.entries(LOAD_COMPANY_CODE_SELECT).map(([value, label]) => ({
        label,
        value,
      })),
    []
  );
  const transferToOptions = companyOptions;
  const personnelOptions = useMemo(
    () =>
      Object.entries(personnels).map(([value, label]) => ({ label, value })),
    [personnels]
  );

  const isValidDate = (dateStr) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

  // Fetch initial lookup & next‑slip data
  useEffect(() => {
    fetchWarehousePersonnels().then(setPersonnels).catch(console.error);
    fetchLotNumberOptions().then(setLotNumberOptions).catch(console.error);
    fetchProductDescriptionOptions().then(setProductDescriptionOptions).catch(console.error);
    fetchNextSlipNumbers().then(setNextSlipNumbers).catch(console.error);
  }, []);

  // Add a blank detail row
  const handleDetailAddRow = () => {
    setDetailRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        lot_number: "",
        product_description: "",
        manufacturing_date: "",
        expiry_date: "",
        quantity: "",
        job_order_number: "",
        remarks: "",
      },
    ]);
  };

  // Remove a detail row
  const handleDetailDeleteRow = (id) => {
    setDetailRows((prev) => prev.filter((r) => r.id !== id));
  };

  // When user selects a lot number: clear then fetch new values
  const handleDetailLotChange = async (id, value) => {
    // clear existing values in that row
    setDetailRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              lot_number: value,
              product_description: "",
              manufacturing_date: "",
              expiry_date: "",
            }
          : r
      )
    );
    if (!value) return;

    try {
      // fetch product description
      const prodVal = await fetchProductByLot(value);
      if (prodVal) {
        setDetailRows((prev) =>
          prev.map((r) =>
            r.id === id
              ? { ...r, product_description: String(prodVal) }
              : r
          )
        );
      }
      // fetch dates
      const prodKey = String(prodVal).split(" ")[0] || "";
      const dates = await fetchDatesByLotAndSku(value, prodKey);
      if (dates?.[0]) {
        const [mfg, exp] = String(dates[0]).split(" ");
        setDetailRows((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  manufacturing_date: isValidDate(mfg) ? mfg : "",
                  expiry_date: isValidDate(exp) ? exp : "",
                }
              : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Generic field change for detail rows
  const handleDetailFieldChange = (id, field, value) => {
    setDetailRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      )
    );
  };

  // Add vertical spacing between DataTable rows
  const detailTableStyles = {
    rows: {
      style: {
        marginBottom: "12px",
      },
    },
  };

  // DataTable column definitions
  const detailColumns = [
    {
      name: <b>LOT NO.</b>,
      cell: (row) => (
        <Typeahead
          id={`lot-${row.id}`}
          options={lotNumberOptions}
          selected={row.lot_number ? [row.lot_number] : []}
          placeholder="LOT NO."
          onChange={(sel) => handleDetailLotChange(row.id, sel[0] || "")}
          className="w-100"
        />
      ),
    },
    {
      name: <b>ITEMS</b>,
      cell: (row) => (
        <Typeahead
          id={`item-${row.id}`}
          options={productDescriptionOptions}
          selected={row.product_description ? [row.product_description] : []}
          placeholder="ITEMS"
          onChange={(sel) =>
            handleDetailFieldChange(row.id, "product_description", sel[0] || "")
          }
          className="w-100"
        />
      ),
    },
    {
      name: <b>MFG. DATE</b>,
      cell: (row) => (
        <input
          type="date"
          className="form-control"
          value={row.manufacturing_date}
          onChange={(e) =>
            handleDetailFieldChange(row.id, "manufacturing_date", e.target.value)
          }
        />
      ),
    },
    {
      name: <b>EXP DATE</b>,
      cell: (row) => (
        <input
          type="date"
          className="form-control"
          value={row.expiry_date}
          onChange={(e) =>
            handleDetailFieldChange(row.id, "expiry_date", e.target.value)
          }
        />
      ),
    },
    {
      name: <b>QUANTITY</b>,
      cell: (row) => (
        <input
          type="number"
          className="form-control"
          value={row.quantity}
          onChange={(e) =>
            handleDetailFieldChange(row.id, "quantity", e.target.value)
          }
        />
      ),
    },
    {
      name: <b>J.O. NO.</b>,
      cell: (row) => (
        <input
          type="text"
          className="form-control"
          value={row.job_order_number}
          onChange={(e) =>
            handleDetailFieldChange(row.id, "job_order_number", e.target.value)
          }
        />
      ),
    },
    {
      name: <b>REMARKS</b>,
      cell: (row) => (
        <input
          type="text"
          className="form-control"
          value={row.remarks}
          onChange={(e) =>
            handleDetailFieldChange(row.id, "remarks", e.target.value)
          }
        />
      ),
    },
    {
      name: <b>ACTIONS</b>,
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDetailDeleteRow(row.id)}
        >
          <i className="icon-trash text-white"></i>
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");
    const payload = {
      transfer_slip: {
        company_code: header.companyCode,
        transfer_slip_number: header.transferSlipNumber,
        transfer_to: header.transferTo,
        received_by: header.receivedBy,
        transfer_slip_type: header.transferSlipType,
        transfer_slip_type_other: header.transferSlipTypeOther,
        transferred_by: header.transferredBy,
        transferred_by_date: header.transferredByDate,
        received_by_date: header.receivedDate,
      },
      transfer_slip_detail: detailRows.map((d) => ({
        lot_number: d.lot_number,
        product_description: d.product_description,
        manufacturing_date: d.manufacturing_date,
        expiry_date: d.expiry_date,
        quantity: d.quantity,
        job_order_number: d.job_order_number,
        remarks: d.remarks,
      })),
    };
    try {
      const response = await saveTransferSlips(payload);
      navigate(`/transfer_slips/${response.data.id}`);
    } catch (err) {
      console.error("Error saving transfer slip:", err);
      setErrorMessage("An error occurred while saving the transfer slip.");
    }
  };

  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <i className="icofont icofont-paper-plane me-2 text-dark"></i>
              Transfer Slip
            </h2>
          </div>
          <div className="card-body">
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Header Fields */}
              <div className="row">
                <div className="col-md-6">
                  {/* Company & TS Number */}
                  <div className="mb-3">
                    <label>Company</label>
                    <Typeahead
                      id="companyCode"
                      labelKey="label"
                      options={companyOptions}
                      selected={
                        header.companyCode
                          ? [
                              companyOptions.find(
                                (o) => o.value === header.companyCode
                              ),
                            ]
                          : []
                      }
                      onChange={(sel) => {
                        const code = sel[0]?.value || "";
                        setHeader((h) => ({
                          ...h,
                          companyCode: code,
                          transferSlipNumber: nextSlipNumbers[code] || "",
                        }));
                      }}
                      placeholder="Select company..."
                    />
                  </div>
                  <div className="mb-3">
                    <label>Transfer Slip Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={header.transferSlipNumber}
                      onChange={(e) =>
                        setHeader((h) => ({
                          ...h,
                          transferSlipNumber: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Transfer To & Received By */}
                  <div className="mb-3">
                    <label>To</label>
                    <Typeahead
                      id="transferTo"
                      labelKey="label"
                      options={transferToOptions}
                      selected={
                        header.transferTo
                          ? [
                              transferToOptions.find(
                                (o) => o.value === header.transferTo
                              ),
                            ]
                          : []
                      }
                      onChange={(sel) =>
                        setHeader((h) => ({
                          ...h,
                          transferTo: sel[0]?.value || "",
                        }))
                      }
                      placeholder="Select destination..."
                    />
                  </div>
                  <div className="mb-3">
                    <label>Received By</label>
                    <input
                      type="text"
                      className="form-control"
                      value={header.receivedBy}
                      onChange={(e) =>
                        setHeader((h) => ({ ...h, receivedBy: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Slip Type */}
                  <div className="mb-3">
                    <label>Transfer Slip Type</label>
                    <Typeahead
                      id="transferSlipType"
                      labelKey="label"
                      options={[
                        { label: "Commercial", value: "Commercial" },
                        { label: "Sample", value: "Sample" },
                        { label: "Other", value: "Other" },
                      ]}
                      selected={
                        header.transferSlipType
                          ? [{ label: header.transferSlipType, value: header.transferSlipType }]
                          : []
                      }
                      onChange={(sel) =>
                        setHeader((h) => ({
                          ...h,
                          transferSlipType: sel[0]?.value || "",
                        }))
                      }
                      placeholder="Select slip type..."
                    />
                    {header.transferSlipType === "Other" && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Specify other type"
                        value={header.transferSlipTypeOther}
                        onChange={(e) =>
                          setHeader((h) => ({
                            ...h,
                            transferSlipTypeOther: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>

                  {/* Transferred By & Dates */}
                  <div className="mb-3">
                    <label>Transferred By</label>
                    <Typeahead
                      id="transferredBy"
                      labelKey="label"
                      options={personnelOptions}
                      selected={
                        header.transferredBy
                          ? [{ label: header.transferredBy, value: header.transferredBy }]
                          : []
                      }
                      onChange={(sel) =>
                        setHeader((h) => ({
                          ...h,
                          transferredBy: sel[0]?.value || "",
                        }))
                      }
                      placeholder="Select person..."
                    />
                  </div>
                  <div className="mb-3">
                    <label>Transferred By Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={header.transferredByDate}
                      onChange={(e) =>
                        setHeader((h) => ({
                          ...h,
                          transferredByDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Received Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={header.receivedDate}
                      onChange={(e) =>
                        setHeader((h) => ({ ...h, receivedDate: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Items Details DataTable */}
              <div className="mb-4">
                <h5 className="mb-3 border-bottom pb-2">Items Details</h5>
                <DataTable
                  columns={detailColumns}
                  data={detailRows}
                  responsive
                  striped
                  bordered
                  noDataComponent="No details added yet"
                  highlightOnHover
                  dense
                  customStyles={detailTableStyles}
                />
                <button
                  type="button"
                  className="btn btn-info btn-sm mt-3"
                  onClick={handleDetailAddRow}
                >
                  Add Row
                </button>
              </div>

              {/* Actions */}
              <div className="d-flex justify-content-between">
                <Link to="/transfer_slips" className="btn btn-secondary btn-sm">
                  Back
                </Link>
                <button type="submit" className="btn btn-success btn-sm">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
