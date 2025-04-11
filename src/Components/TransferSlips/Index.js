import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import DataTable from "react-data-table-component";
import { getTransferSlips,  } from "../../Services/TransferSlipsServices";
// import NewModal from "./NewModal";
// import EditModal from "./EditModal";
// import DeleteModal from "./DeleteModal";

export default Index = () => {
  const [isShowOpen, setIsShowOpen] = useState(false);
  const [args, setArgs] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshItems = () => {
    getTransferSlips(args)
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
  // Handler for deleting a record.
  const handleDelete = (id) => { 
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteAgentUserMenu(id)
        .then(() => {
          window.location.reload();
          alert("Record deleted successfully");
        }
        )
        .catch((err) => {
          console.error("Error deleting record", err);
        });
    }
  };
  


  // Define the columns for your table
  const columns = [
    {
      name: <b>Company</b>,
      selector: (row) => row.company_code,
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
      selector: (row) => row.transfer_to,
    },
    {
      name: <b>Transferred by</b>,
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
          <Link
          type="button"
          title="Show"
          data-bs-toggle="modal"
          data-bs-target="#showModal"
          >
            <i className="icon-eye text-warning me-1"></i>
          </Link>
          <Link 
          type="button"
          title="Edit"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          >
            <i className="icon-pencil-alt text-info me-1"></i>
          </Link>

          <Link
          type="button"
          title="Print"
          data-bs-toggle="modal"
          data-bs-target="#printModal"
          >
            <i className="icon-printer text-secondary"></i>
          </Link>
          
          <Link
          type="button"
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

