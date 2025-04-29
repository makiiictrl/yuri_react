// src/components/transfer_slips/Index.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getTransferSlips } from "../../Services/TransferSlipsServices";
import { LOAD_COMPANY_CODE_SELECT } from "../../Config/CompanyCodes";

export default function Index() {
  const [args, setArgs]           = useState({});
  const [data, setData]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // print modal state
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printType, setPrintType]           = useState("blank");
  const [selectedSlipId, setSelectedSlipId] = useState(null);
  const [companyCode, setCompanyCode]       = useState(
    Object.keys(LOAD_COMPANY_CODE_SELECT)[0]
  );

  // fetch list
  useEffect(() => {
    getTransferSlips()
      .then(res => { setData(res.data); setLoading(false); })
      .catch(err => { console.error(err); setError(err); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!args.transfer_slip_number) return;
    getTransferSlips(args)
      .then(res => setData(res.data))
      .catch(() => alert("Error fetching data."));
  }, [args]);

  const openPrint = (type, slipId = null) => {
    setPrintType(type);
    setSelectedSlipId(slipId);
    if (type === "blank") {
      setCompanyCode(Object.keys(LOAD_COMPANY_CODE_SELECT)[0]);
    }
    setPrintModalOpen(true);
  };

  const handlePrintConfirm = () => {
    const params = new URLSearchParams();
    params.set("transfer_slips_type", printType);
    if (printType === "blank") {
      params.set("choose_company_code", companyCode);
    } else {
      params.set("transfer_slip_id", selectedSlipId);
    }
    window.open(`${API_BASE_URL}/transfer_slips/print.pdf?${params}`, "_blank");
    setPrintModalOpen(false);
  };

  const columns = [
    { name: <b>Company</b>,         selector: r => LOAD_COMPANY_CODE_SELECT[r.company_code] || r.company_code, sortable: true },
    { name: <b>Transfer Slip No.</b>, selector: r => r.transfer_slip_number, sortable: true },
    { name: <b>Type</b>,            selector: r => r.transfer_slip_type },
    { name: <b>To</b>,              selector: r => LOAD_COMPANY_CODE_SELECT[r.transfer_to] || r.transfer_to },
    { name: <b>Transferred By</b>,  selector: r => r.transferred_by },
    { name: <b>Transferred Date</b>,selector: r => r.transferred_by_date },
    { name: <b>Received</b>,        selector: r => r.received_by },
    { name: <b>Received Date</b>,   selector: r => r.received_by_date },
    {
      name: <b>Actions</b>,
      cell: row => (
        <div className="action">
          <Link to={`/transfer_slips/${row.id}`} title="View">
            <i className="icon-eye text-primary me-1"></i>
          </Link>
          <Link
            to={`/transfer_slips/edit/${row.id}`}
            title="Edit"
            className="text-info me-1"
          >
            <i className="icon-pencil-alt"></i>
          </Link>
          {/* row printer as a Link for consistent styling */}
          <Link
            title="Print Filled Slip"
            className="text-secondary me-1"
            onClick={() => openPrint("full", row.id)}
            style={{ cursor: "pointer" }}
          >
            <i className="icon-printer"></i>
          </Link>
          <Link
            title="Delete"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            <i className="icon-trash text-danger"></i>
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    }
  ];

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error loading data.</p>;

  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <i className="icofont icofont-paper-plane me-2 text-dark" />
              Transfer Slips
            </h2>
            <div className="d-flex align-items-center">
              <div className="input-group me-2">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Search..."
                  onInput={e => setArgs({ ...args, transfer_slip_number: e.target.value })}
                />
                <button className="btn btn-outline-primary btn-sm">
                  <i className="icofont icofont-search-alt-1"></i>
                </button>
              </div>
              {/* top‑level printer as Link */}
              <Link
                title="Print Blank Slip"
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => openPrint("blank")}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <i className="icofont icofont-printer"></i> Blank
              </Link>
              <Link
                className="btn btn-outline-primary btn-sm flex-shrink-0 w-auto"
                to="/transfer_slips/new"
              >
                New Transfer Slip
              </Link>
            </div>
          </div>
          <div className="card-body">
            <DataTable
              columns={columns}
              data={data}
              pagination
              responsive
              striped
              bordered
              highlightOnHover
              noDataComponent="No Transfer Slips"
            />
          </div>
        </div>
      </div>

      {printModalOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {printType === "blank"
                    ? "Select Company for Blank Slip"
                    : `Print Slip #${selectedSlipId}`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPrintModalOpen(false)}
                />
              </div>
              <div className="modal-body">
                {printType === "blank" ? (
                  <select
                    className="form-select"
                    value={companyCode}
                    onChange={e => setCompanyCode(e.target.value)}
                  >
                    {Object.entries(LOAD_COMPANY_CODE_SELECT).map(
                      ([code, name]) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <p>
                    About to print transfer slip{" "}
                    <strong>#{selectedSlipId}</strong>.
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPrintModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handlePrintConfirm}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
