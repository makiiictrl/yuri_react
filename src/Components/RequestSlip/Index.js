import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  getRequestSlips,
  getItems,
  deleteRequestSlip,
} from "../../Services/RequestSlipsServices";
import axiosInstance from "../../Login/ApiLogin";

export default function Index() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [args, setArgs]       = useState({});

  // load / refresh list
  const refreshItems = () => {
    getItems(args)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching data", err);
        alert("Error fetching data.");
      });
  };

  useEffect(() => {
    refreshItems();
  }, [args]);

  useEffect(() => {
    getRequestSlips()
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // PDF fetcher
  const fetchAndOpenPdf = async (path) => {
    try {
      const response = await axiosInstance().get(path, {
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error("Error fetching PDF:", err);
      alert("Unable to generate PDF. Please try again.");
    }
  };

  // delete handler
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    deleteRequestSlip(id)
      .then(() => {
        alert("Deleted");
        refreshItems();
      })
      .catch(err => console.error("Error deleting record", err));
  };

  const columns = [
    { name: <b>ID</b>, selector: row => row.id, omit: true },
    { name: <b>Company</b>, selector: row => row.company_code === 1 ? "CDCI" : "CYDC", sortable: true },
    { name: <b>Request #</b>, selector: row => row.request_number, sortable: true },
    { name: <b>Date</b>, selector: row => row.request_date, sortable: true },
    { name: <b>Employee</b>, selector: row => row.employee_name, sortable: true },
    { name: <b>Address</b>, selector: row => row.address },
    { name: <b>Purpose</b>, selector: row =>
        row.type_of_request === "Others"
          ? `${row.type_of_request} (${row.sub_type_of_request})`
          : row.type_of_request
    },
    {
      name: <b>Actions</b>,
      cell: row => (
        <div className="action">
          <Link to={`/request_slips/edit/${row.id}`}>
            <i className="icon-pencil-alt text-info me-1"></i>
          </Link>
          <span
            onClick={() =>
              fetchAndOpenPdf(`/request_slips/${row.id}/print_slip_request`)
            }
            style={{ cursor: "pointer" }}
            title="Print"
          >
            <i className="icon-printer text-secondary ms-1"></i>
          </span>
          <button
            onClick={() => handleDelete(row.id)}
            style={{ background: "none", border: "none", cursor: "pointer", margin: '1 0px' }}
          >
            <i className="icon-trash text-danger"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error loading data</p>;

  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          <div className="card-header d-flex justify-content-between">
            <h2>
              <i className="icofont icofont-document-folder me-2" />
              Request Slips
            </h2>
            <div className="d-flex align-items-center">
              <div className="input-group me-2">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Search..."
                  aria-label="Request Number"
                  onInput={(e) => {
                    setArgs({ ...args, request_number: e.target.value });
                  }}
                />
                <button
                  className="btn btn-outline-primary btn-sm"
                  type="button"
                >
                  <i className="icofont icofont-search-alt-1"></i>
                </button>
              </div>
              <Link
                className="btn btn-outline-primary btn-sm flex-shrink-0 w-auto"
                to="/request_slips/new"
              >
                New Request Slip
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
              noDataComponent="No Records of Request Slip"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
