import React, { useState, useEffect } from "react";
import UseCurrentAgent from "../../Login/UseCurrentAgent";
import DataTable from "react-data-table-component";
import NewAgentListModal from "./NewAgentModal";
import { Link } from "react-router-dom";
import { getAgents, deleteAgent } from "../../Services/DashboardServices";
import EditAgentModal from "./EditAgentModal";
import EditAccount from "../../Layouts/EditAccount";

function formatName(fullName = "") {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default AdminDashboard = () => {
  const { agent } = UseCurrentAgent();
  const fullName = `${agent?.first_name ?? ""} ${agent?.last_name ?? ""}`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [args, setArgs] = useState({});
  const [currentAgent, setCurrentAgent] = useState({});

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteAgent(id)
        .then(() => {
          window.location.reload();
          alert("Record deleted successfully");
        })
        .catch((err) => {
          console.error("Error deleting record", err);
        });
    }
  };
  const refreshItems = () => {
    getAgents(args)
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
    getAgents()
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

  // Define DataTable columns
  const columns = [
    {
      name: <b>Full Name</b>,
      selector: (row) => {
        const first = row.first_name || "";
        const last = row.last_name || "";
        const Name = `${first} ${last}`.trim();
        return Name ? Name : "No Fullname";
      },
      sortable: true,
    },
    {
      name: <b>Middle Initial</b>,
      selector: (row) => row.initials,
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.email,
    },
    {
      name: <b>Admin</b>,
      selector: (row) =>
        row.admin === true ? (
          <i className="icofont icofont-ui-check text-success"></i>
        ) : (
          <i className="icofont icofont-ui-close text-danger"></i>
        ),
      center: "true",
    },
    {
      name: <b>Super Admin</b>,
      selector: (row) =>
        row.super_admin === true ? (
          <i className="icofont icofont-ui-check text-success"></i>
        ) : (
          <i className="icofont icofont-ui-close text-danger"></i>
        ),
      center: "true",
    },
    {
      name: <b>YSS</b>,
      selector: (row) =>
        row.yss === true ? (
          <i className="icofont icofont-ui-check text-success"></i>
        ) : (
          <i className="icofont icofont-ui-close text-danger"></i>
        ),
      center: "true",
    },
    {
      name: <b>Credit</b>,
      selector: (row) =>
        row.credit === true ? (
          <i className="icofont icofont-ui-check text-success"></i>
        ) : (
          <i className="icofont icofont-ui-close text-danger"></i>
        ),
      center: "true",
    },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
            onClick={() => setCurrentAgent(row)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i className="icon-pencil-alt text-info"></i>
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i className="icon-trash text-danger"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: "true",
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
                        <button
                          className="btn btn-outline-primary btn-sm ms-2"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#editAccountModal"
                        >
                          <i className="icofont icofont-ui-edit"></i> Edit
                        </button>
                        <EditAccount />
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

        {/* Agent List */}
        <div className="container mt-2">
          {/* Reduced from my-3 to mt-2 (or even mt-1) to minimize vertical gap */}
          <div className="row">
            <div className="col-12">
              <div className="card title-line">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">
                    <i className="icofont icofont-users-social"></i> {"  "}
                    Agents List
                  </h2>
                  <div className="d-flex align-items-center">
                    <div className="input-group me-2">
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Search..."
                        aria-label="Search..."
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

                    {/* Button that triggers the modal */}
                    <button
                      className="btn btn-outline-primary btn-sm flex-shrink-0 w-auto"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#largeModal"
                    >
                      New Agent
                    </button>
                    <EditAgentModal agentToEdit={currentAgent} />

                    {/* Import and include the separate modal component */}
                    <NewAgentListModal />
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
                    noDataComponent="No Records of Agent User Menu"
                    highlightOnHover
                    paginationRowsPerPageOptions={[10, 50, 100, 500, 1000]}
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
