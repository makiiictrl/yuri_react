import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DataTable from 'react-data-table-component';
import axios from "axios";
import { getAgentUserMenus, deleteAgentUserMenu } from "../../Services/AgentUserMenusServices";


export default Index = () => {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    getAgentUserMenus()
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
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
          
        })
        .catch(err => {
          console.error("Error deleting record", err);
        });
    }
  };  
  const columns = [
    {
      name: <b>Agent ID</b>,
      selector: row => row.agent_id,
      sortable: true,
    },
    {
      name: <b>Menu ID</b>,
      selector: row => row.agent_menu_id,
      sortable: true,
    },
    {
      name: <b>Menu Description</b>,
      selector: row => row.menu,
    },
    {
      name: <b>Create</b>,
      selector: row => row.user_create,
    },
    {
      name: <b>Read</b>,
      selector: row => row.user_read,
    },
    {
      name: <b>Update</b>,
      selector: row => row.user_update,
    },
    {
      name: <b>Delete</b>,
      selector: row => row.user_delete,
    },
    {
      name: <b>Print</b>,
      selector: row => row.user_print,

    },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">

          <Link to={`/edit/${row.id}`}><i className="icon-pencil-alt text-info"></i></Link>
          <button
        onClick={() => handleDelete(row.agent_user_menus_id)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <i className="icon-trash text-danger"></i>
      </button>

        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];


  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error loading data</p>;


  return (
    <div className="page-body">
      {/* <NewModal />
      <EditModal />
      <DeleteModal /> */}
      <div className="col-sm-12">
        <div className="card title-line">

          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">

              <i className="icofont icofont-id-card me-2"></i>
              Agent User Menus
            </h2>
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#newModal"
            >
              New Agent User Menu
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

