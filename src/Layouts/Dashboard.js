import React from "react";
import UseCurrentAgent from "../Login/UseCurrentAgent";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function formatName(fullName = "") {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const Dashboard = () => {
  const { agent } = UseCurrentAgent();
  const fullName = `${agent?.first_name ?? ""} ${agent?.last_name ?? ""}`;

  // Define DataTable columns
  const columns = [
    {
      name: <b> # </b>,
      selector: (row) => row.agentId,
      sortable: true,
    },
    {
      name: <b>Full Name</b>,
      selector: (row) => row.menuId,
      sortable: true,
    },
    {
      name: <b>Middle Initial</b>,
      selector: (row) => row.menuDescription,
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.create,
    },
    {
      name: <b>Admin</b>,
      selector: (row) => row.read,
    },
    {
      name: <b>SuperAdmin</b>,
      selector: (row) => row.update,
    },
    {
      name: <b>YSS</b>,
      selector: (row) => row.delete,
    },
    {
      name: <b>Credit</b>,
      selector: (row) => row.print,
    },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">
          <Link
            to="#"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            <i className="icon-pencil-alt text-info"></i>
          </Link>
          <Link
            to="#"
            type="button"
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

  // Sample data for the DataTable
  const data = [
    {
    },
  ];

  return (
    <React.Fragment>
      <div className="page-body">
        {/* Welcome Section */}
        <div className="container-fluid default-dashboard">
          <div className="row">
            <div className="col-12">
              <div className="card title-line upgrade-card overflow-hidden w-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="text-section">
                      <h1 className="text-nowrap">
                        Hi, Welcome back{" "}
                        <span className="txt-primary">
                          {formatName(fullName)}
                        </span>
                      </h1>
                    </div>
                    <div className="image-section">
                      <img
                        className="img-fluid pt-2" 
                        // reduced top padding
                        src="../assets/images/dashboard/welcome.png"
                        alt="vector"
                      />
                    </div>
                  </div>
                </div>
                <img
                  className="img-fluid pattern-image"
                  src="../assets/images/dashboard/bg-1.png"
                  alt="vector pattern"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Slips Section */}
        <div className="container mt-2">
          {/* Reduced from my-3 to mt-2 (or even mt-1) to minimize vertical gap */}
          <div className="row">
            <div className="col-12">
              <div className="card title-line">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">
                    <i className="icofont icofont-id-card me-2"></i>
                    Transfer Slips
                  </h2>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#newModal"
                  >
                    New Transfer Slip
                  </button>
                </div>
                <div className="card-body">
                  <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    responsive
                    striped
                    bordered
                    noDataComponent="No Records of Agent User Menu"
                    highlightOnHover
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
