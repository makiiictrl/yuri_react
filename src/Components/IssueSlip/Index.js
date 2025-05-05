import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getIssueSlips, getItems, deleteIssueSlip} from "../../Services/IssueSlipsServices";
import axiosInstance from "../../Login/ApiLogin";

export default Index = () => {
  const [data, setData] = useState([]);
  const [args, setArgs] = useState({});
  const [loading, setLoading] = useState(true);
  ``;
  const [error, setError] = useState(null);

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

  const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this record?")) {
        deleteIssueSlip(id)
          .then(() => {
            window.location.reload();
            alert("Record deleted successfully");
            
          })
          .catch(err => {
            console.error("Error deleting record", err);
          });
      }
    };  

  useEffect(() => {
    refreshItems();
  }, [args]);

  useEffect(() => {
    getIssueSlips()
      .then((response) => {
        console.log("Response from API:", response);
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
      center: true,
    },

    {
      name: <b>Issuance No.</b>,
      selector: (row) => row.issuance_number,
      width: "150px",
      whiteSpace: "nowrap",
      // center: true,
      sortable: true,
    },

    {
      name: <b>Request Number</b>,
      selector: (row) => row.request_number,
      width: "170px",
      whiteSpace: "nowrap",
      // center: true,
      sortable: true,
    },

    {
      name: <b>Issuance Date</b>,
      selector: (row) => row.issuance_date,
      width: "150px",
      whiteSpace: "nowrap",
      // center: true,
      sortable: true,
    },

    {
      name: <b>Employee Name</b>,
      selector: (row) => row.employee_name,
      width: "200px",
      whiteSpace: "nowrap",
      // center: true,
      sortable: true,
    },

    {
      name: <b>Address</b>,
      selector: (row) => row.address,
      width: "270px",
      whiteSpace: "nowrap",
      // center: true,
      sortable: true,
    },

    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">
          <Link to={`/issue_slips/edit/${row.id}`} className="d-inline-block" title="Edit">
            <i className="icon-pencil-alt text-info"></i>
          </Link>
          <span
            title="Print Issue Slip"
            className="text-secondary ms-2"
            style={{ cursor: "pointer" }}
            onClick={() =>
              fetchAndOpenPdf(`/issue_slips/${row.id}/print_issue_slip`)
            }
          >
            <i className="icon-printer"></i>
          </span>
          <button
            onClick={() => handleDelete(row.id)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            title="Delete"
          >
            <i className="icon-trash text-danger"></i>
          </button>
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
              <i className="icofont icofont-paper me-2 text-dark"></i>
              Issue Slips
            </h2>
            <div className="d-flex align-items-center">
              <div className="input-group me-2">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  onInput={(e) => {
                    setArgs({ ...args, search: e.target.value });
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
                to="/issue_slips/new"
              >
                New Issue Slip
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
              noDataComponent="No Records of Issue Slip"
              highlightOnHover
              paginationRowsPerPageOptions={[10, 50, 100, 500, 1000]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
