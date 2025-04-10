import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
// import NewModal from "./NewModal";
// import EditModal from "./EditModal";
// import DeleteModal from "./DeleteModal";

export default Index = () => {
  const [isShowOpen, setIsShowOpen] = useState(false);

  // Define the columns for your table
  const columns = [
    {
      name: <b>Agent ID</b>,
      selector: (row) => row.agentId,
      sortable: true,
    },
    {
      name: <b>Menu ID</b>,
      selector: (row) => row.menuId,
      sortable: true,
    },
    {
      name: <b>Menu Description</b>,
      selector: (row) => row.menuDescription,
    },
    {
      name: <b>Create</b>,
      selector: (row) => row.create,
    },
    {
      name: <b>Read</b>,
      selector: (row) => row.read,
    },
    {
      name: <b>Update</b>,
      selector: (row) => row.update,
    },
    {
      name: <b>Delete</b>,
      selector: (row) => row.delete,
    },
    {
      name: <b>Print</b>,
      selector: (row) => row.print,
    },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">
          <Link 
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          >
            <i className="icon-pencil-alt text-info"></i>
          </Link>
          
          <Link
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

  // Sample data for the table
  const data = [
    {
      id: 1,
      agentId: "3723",
      menuId: "1",
      menuDescription: "Transfer Slip",
      create: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
      read: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
      delete: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-close"></i>
          </i>
        </span>
      ),
      update: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
      print: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
    },
    {
      id: 2,
      agentId: "3723",
      menuId: "2",
      menuDescription: "Transfer Slip",
      create: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
      read: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
      delete: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-close"></i>
          </i>
        </span>
      ),
      update: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
      print: (
        <span className="action-box large complete-btn" title="Mark Complete">
          <i className="icon">
            <i className="icon-check"></i>
          </i>
        </span>
      ),
    },
  ];

  return (
    <div className="page-body">
      
      <div className="col-sm-12">
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
  );
};

