// File: src/components/TransferSlipEditForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  fetchTransferSlip,
  updateTransferSlip,
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

export default function TransferSlipEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // header
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

  // detail rows
  const [detailRows, setDetailRows] = useState([]);

  // lookups
  const [lotNumberOptions, setLotNumberOptions] = useState([]);
  const [productDescriptionOptions, setProductDescriptionOptions] = useState(
    []
  );
  const [personnels, setPersonnels] = useState({});
  const [nextSlipNumbers, setNextSlipNumbers] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // build typeahead lists
  const companyOptions = useMemo(
    () =>
      Object.entries(LOAD_COMPANY_CODE_SELECT).map(([value, label]) => ({
        value,
        label,
      })),
    []
  );
  const transferToOptions = companyOptions;
  const personnelOptions = useMemo(
    () =>
      Object.entries(personnels).map(([value, label]) => ({ value, label })),
    [personnels]
  );

  const isValidDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);

  // initial load
  useEffect(() => {
    fetchWarehousePersonnels().then(setPersonnels).catch(console.error);
    fetchLotNumberOptions().then(setLotNumberOptions).catch(console.error);
    fetchProductDescriptionOptions()
      .then(setProductDescriptionOptions)
      .catch(console.error);
    fetchNextSlipNumbers().then(setNextSlipNumbers).catch(console.error);

    if (id) {
      fetchTransferSlip(id)
        .then(({ data }) => {
          const slip = data.transfer_slip;
          const details = data.details || [];
          setHeader({
            companyCode: slip.company_code?.toString() || "",
            transferSlipNumber: slip.transfer_slip_number || "",
            transferTo: slip.transfer_to?.toString() || "",
            receivedBy: slip.received_by || "",
            transferSlipType: slip.transfer_slip_type || "",
            transferSlipTypeOther: slip.transfer_slip_type_other || "",
            transferredBy: slip.transferred_by?.toString() || "",
            transferredByDate: slip.transferred_by_date || "",
            receivedDate: slip.received_by_date || "",
          });
          setDetailRows(
            details.map((d, i) => ({
              id: Date.now() + i,
              lot_number: d.lot_number,
              product_description: d.product_description,
              manufacturing_date: d.manufacturing_date,
              expiry_date: d.expiry_date,
              quantity: d.quantity,
              job_order_number: d.job_order_number,
              remarks: d.remarks,
            }))
          );
        })
        .catch((err) => {
          console.error("Failed to load slip:", err);
          setErrorMessage("Could not load transfer slip for editing.");
        });
    }
  }, [id]);

  // detail row handlers
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
  const handleDetailDeleteRow = (rid) =>
    setDetailRows((prev) => prev.filter((r) => r.id !== rid));

  const handleDetailLotChange = async (rid, value) => {
    setDetailRows((prev) =>
      prev.map((r) =>
        r.id === rid
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
      const prodVal = await fetchProductByLot(value);
      if (prodVal) {
        setDetailRows((prev) =>
          prev.map((r) =>
            r.id === rid ? { ...r, product_description: String(prodVal) } : r
          )
        );
      }
      const sku = String(prodVal).split(" ")[0] || "";
      const dates = await fetchDatesByLotAndSku(value, sku);
      if (dates?.[0]) {
        const [mfg, exp] = String(dates[0]).split(" ");
        setDetailRows((prev) =>
          prev.map((r) =>
            r.id === rid
              ? {
                  ...r,
                  manufacturing_date: isValidDate(mfg) ? mfg : "",
                  expiry_date: isValidDate(exp) ? exp : "",
                }
              : r
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDetailFieldChange = (rid, field, v) =>
    setDetailRows((prev) =>
      prev.map((r) => (r.id === rid ? { ...r, [field]: v } : r))
    );

  const detailTableStyles = {
    rows: { style: { marginBottom: "12px" } },
  };

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
          inputProps={{ className: "form-control-sm" }}
          positionFixed
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
          inputProps={{ className: "form-control-sm" }}
          positionFixed
        />
      ),
    },
    {
      name: <b>MFG. DATE</b>,
      cell: (row) => (
        <input
          type="date"
          className="form-control form-control-sm text-center"
          value={row.manufacturing_date}
          onChange={(e) =>
            handleDetailFieldChange(
              row.id,
              "manufacturing_date",
              e.target.value
            )
          }
        />
      ),
    },
    {
      name: <b>EXP DATE</b>,
      cell: (row) => (
        <input
          type="date"
          className="form-control form-control-sm text-center"
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
          className="form-control form-control-sm"
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
          className="form-control form-control-sm"
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
          className="form-control form-control-sm"
          value={row.remarks}
          onChange={(e) =>
            handleDetailFieldChange(row.id, "remarks", e.target.value)
          }
        />
      ),
    },
    {
      name: <b></b>,
      cell: (row) => (
        <button
          className="btn-lg"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "1 0px",
          }}
          onClick={() => handleDetailDeleteRow(row.id)}
        >
          <i className="icofont icofont-close text-secondary"></i>
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  // submit
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
      const res = await updateTransferSlip(id, payload);
      navigate(`/transfer_slips/${res.data.transfer_slip.id}`);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.errors?.join(", ") ||
          "An error occurred while updating."
      );
    }
  };

  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          <div className="card-header d-flex justify-content-between">
            <h2>
              <i className="icofont icofont-paper-plane me-2 text-dark"></i>
              Edit Transfer Slip
            </h2>
          </div>
          <div className="card-body">
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label>Company</label>
                    <Typeahead
                      id="companyCode"
                      disabled
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
                          transferSlipNumber:
                            nextSlipNumbers[code] || h.transferSlipNumber,
                        }));
                      }}
                      placeholder="Select company..."
                    />
                  </div>
                  <div className="mb-3">
                    <label>TS Number</label>
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
                      disabled
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
                  <div className="mb-3">
                    <label>Transfer Slip Type</label>
                    <Typeahead
                      id="transferSlipType"
                      labelKey="label"
                      options={[
                        { value: "Commercial", label: "Commercial" },
                        { value: "Sample", label: "Sample" },
                        { value: "Other", label: "Other" },
                      ]}
                      selected={
                        header.transferSlipType
                          ? [
                              {
                                value: header.transferSlipType,
                                label: header.transferSlipType,
                              },
                            ]
                          : []
                      }
                      onChange={(sel) =>
                        setHeader((h) => ({
                          ...h,
                          transferSlipType: sel[0]?.value || "",
                        }))
                      }
                      placeholder="Select slip type..."
                      disabled
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
                  <div className="mb-3">
                    <label>Transferred By</label>
                    <Typeahead
                      id="transferredBy"
                      labelKey="label"
                      options={personnelOptions}
                      selected={
                        header.transferredBy
                          ? [
                              personnelOptions.find(
                                (o) => o.value === header.transferredBy
                              ),
                            ]
                          : []
                      }
                      onChange={(sel) =>
                        setHeader((h) => ({
                          ...h,
                          transferredBy: sel[0]?.value || "",
                        }))
                      }
                      placeholder="Select person..."
                      disabled
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
                        setHeader((h) => ({
                          ...h,
                          receivedDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="mb-3 border-bottom pb-2">Items Details</h5>
                <DataTable
                  columns={detailColumns}
                  data={detailRows}
                  responsive
                  striped
                  bordered
                  highlightOnHover
                  dense
                  customStyles={detailTableStyles}
                  noDataComponent="No details added yet"
                />
                <button
                  type="button"
                  className="btn btn-info btn-sm mt-3"
                  onClick={handleDetailAddRow}
                >
                  Add Row
                </button>
              </div>

              <div className="d-flex justify-content-between">
                <Link to="/transfer_slips" className="btn btn-secondary btn-sm">
                  Back
                </Link>
                <button type="submit" className="btn btn-success btn-sm">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
