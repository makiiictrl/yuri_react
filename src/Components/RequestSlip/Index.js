import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import {
  getRequestSlips,
  getItems,
  deleteRequestSlip,
} from "../../Services/RequestSlipsServices";

export default Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [args, setArgs] = useState({});

  const refreshItems = () => {
    getItems(args)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((response) => {
        alert("Error in fetching data.");
        console.log(response);
      });
  };

  useEffect(() => {
    refreshItems();
  }, [args]);

  useEffect(() => {
    getRequestSlips()
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // // Handler for deleting a record.
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteRequestSlip(id)
        .then(() => {
          alert("Record deleted successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.error("Error deleting record", err);
        });
    }
  };
  const columns = [
    {
      name: <b>ID</b>,
      selector: (row) => row.id,
      omit: true, // this hides the column from the table view
    },
    {
      name: <b>Company</b>,
      selector: (row) => (row.company_code === 1 ? "CDCI" : "CYDC"),
      width: "125px",
      whiteSpace: "nowrap",
      sortable: true,
      center: true,
    },
    {
      name: <b>Request Number</b>,
      selector: (row) => row.request_number,
      sortable: true,
      width: "160px",
      whiteSpace: "nowrap",
    },
    {
      name: <b>Request Date</b>,
      selector: (row) => row.request_date,
      sortable: true,
      width: "140px",
      whiteSpace: "nowrap",
    },
    {
      name: <b>Employee Name</b>,
      selector: (row) => row.employee_name,
      sortable: true,
      width: "250px",
      whiteSpace: "nowrap",
    },
    {
      name: <b>Address</b>,
      selector: (row) => row.address,
      width: "175px",
      whiteSpace: "nowrap",
    },
    {
      name: <b>Purpose of Request</b>,
      selector: (row) =>
        row.type_of_request === "Others"
          ? `${row.type_of_request} (${row.sub_type_of_request})`
          : row.type_of_request,
      width: "225px",
      whiteSpace: "nowrap",
    },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">
<<<<<<< HEAD
          <Link
            to={`/request_slips/edit/${row.id}`}
            title="Edit"
            className="d-inline-block"
          >
          <i className="icon-pencil-alt text-info me-1"></i>
=======
          <Link to={`/request_slips/edit/${row.id}`}>
            <i className="icon-pencil-alt text-info me-1"></i>
>>>>>>> 12a516c9ece1bdfeed1bb7a15d5ce372988fdd8f
          </Link>
          <Link
            to={`${API_BASE_URL}/request_slips/${row.id}/print_slip_request`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="icon-printer text-secondary ms-1"></i>
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
<<<<<<< HEAD

            style={{ background: "none", border: "none", cursor: "pointer", margin: '1 0px' }}
=======
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              margin: "1 0px",
            }}
>>>>>>> 12a516c9ece1bdfeed1bb7a15d5ce372988fdd8f
          >
            <i className="icon-trash text-danger"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <i className="icofont icofont-document-folder me-2 text-dark"></i>
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
              noDataComponent="No Records of Request Slip"
              highlightOnHover
              paginationRowsPerPageOptions={[10, 50, 100, 500, 1000]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
