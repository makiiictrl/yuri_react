import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getTransferSlips } from "../../Services/TransferSlipsServices";
import { LOAD_COMPANY_CODE_SELECT } from "../../Config/CompanyCodes";
import Show from "./Show";

export default function Index() {
  const [isShowOpen, setIsShowOpen] = useState(false);
  const [args, setArgs] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshItems = () => {
    getTransferSlips(args)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        alert("Error in fetching data.");
      });
  };

  useEffect(() => {
    refreshItems();
  }, [args]);

  useEffect(() => {
    getTransferSlips()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      name: <b>Company</b>,
      selector: (row) =>
        LOAD_COMPANY_CODE_SELECT[row.company_code?.toString()] ||
        row.company_code,
      sortable: true,
    },
    {
      name: <b>Transfer Slip Number</b>,
      selector: (row) => row.transfer_slip_number,
      sortable: true,
    },
    {
      name: <b>Transfer Slip Type</b>,
      selector: (row) => row.transfer_slip_type,
    },
    {
      name: <b>To</b>,
      selector: (row) =>
        LOAD_COMPANY_CODE_SELECT[row.transfer_to?.toString()] ||
        row.transfer_to,
    },
    {
      name: <b>Transferred By</b>,
      selector: (row) => row.transferred_by,
    },
    {
      name: <b>Transferred Date</b>,
      selector: (row) => row.transferred_by_date,
    },
    {
      name: <b>Received</b>,
      selector: (row) => row.received_by,
    },
    {
      name: <b>Received Date</b>,
      selector: (row) => row.received_by_date,
    },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">
          <Link to={`/transfer_slips/${row.id}`} title="View">
            <i className="icon-eye text-primary me-1"></i>
          </Link>
          <Link
            to={`/transfer_slips/edit/${row.id}`}
            title="Edit"
            className="text-info me-1"
          >
            <i className="icon-pencil-alt text-info"></i>
          </Link>
          <Link
            title="Print"
            data-bs-toggle="modal"
            data-bs-target="#printModal"
          >
            <i className="icon-printer text-secondary"></i>
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
    },
  ];

  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          

          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <i className="icofont icofont-paper-plane me-2 text-dark"></i>
              Transfer Slips
            </h2>

            <div className="d-flex align-items-center">
            <div className="input-group me-2">
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Search..."
                aria-label="Request Number"
                onInput={(e) => {
                  setArgs({ ...args, transfer_slip_number: e.target.value });
                }}
              />
              <button className="btn btn-outline-primary btn-sm" type="button">
                <i className="icofont icofont-search-alt-1"></i>
              </button>
            </div>
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
              paginationRowsPerPageOptions={[10, 50, 100, 500, 1000]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
