import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DataTable from 'react-data-table-component';
import axios from "axios";
import { getAgentUserMenus, deleteAgentUserMenu, getItems } from "../../Services/AgentUserMenusServices";

export default Index = () => {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true); ``
  const [error, setError] = useState(null); 

  const [args, setArgs] = useState({});

  const refreshItems = () => {
    getItems(args).then((response) => {
        console.log(response.data);
        setData(response.data);
    }).catch((response) => {
        alert("Error in fetching data.");
        console.log(response);
    });
  }

  useEffect(() => {
      refreshItems();
  }, [args]);

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
      name: <b>ID</b>,
      selector: row => row.agent_user_menus_id,
      omit: true, // this hides the column from the table view
    },
    {
      name: <b>Agent ID</b>,
      selector: row => row.agent_id,
      sortable: true,
    },
    {
      name: <b>Agent Name</b>,
      selector: row => row.first_name + ' ' + row.last_name,
      sortable: true,
      minWidth: '250px',
      whiteSpace: 'nowrap',
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
      selector: row => row.user_create === 1? <i className="icofont icofont-ui-check text-success"></i> : <i className="icofont icofont-ui-close text-danger"></i>,
      center: true
    },
    {
      name: <b>Read</b>,
      selector: row => row.user_read === 1? <i className="icofont icofont-ui-check text-success"></i> : <i className="icofont icofont-ui-close text-danger"></i>,
      center: true
    },
    {
      name: <b>Update</b>,
      selector: row => row.user_update === 1? <i className="icofont icofont-ui-check text-success"></i> : <i className="icofont icofont-ui-close text-danger"></i>,
      center: true
    },
    {
      name: <b>Delete</b>,
      selector: row => row.user_delete === 1? <i className="icofont icofont-ui-check text-success"></i> : <i className="icofont icofont-ui-close text-danger"></i>,
      center: true
    },
    {
      name: <b>Print</b>,
      selector: row => row.user_print === 1? <i className="icofont icofont-ui-check text-success"></i> : <i className="icofont icofont-ui-close text-danger"></i>,
      center: true
    },
    {
      name: <b>Actions</b>,
      cell: (row) => (
        <div className="action">
          <Link
            to={`/agent_user_menus/edit/${row.agent_user_menus_id}`}
          >
          <i className="icon-pencil-alt text-info"></i>
          </Link>
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
    }
  ];


  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error loading data</p>;


  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <i className="icofont icofont-users me-2 text-dark"></i>
            Agent User Menus
          </h2>
          <div className="d-flex align-items-center">
            <div className="input-group me-2">
              <input 
                className="form-control form-control-sm" 
                type="number" 
                placeholder="Agent ID" 
                aria-label="Agent ID"
                onInput={(e) => {
                setArgs({...args,
                    agent_id: e.target.value
                })
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
              to="/agent_user_menus/new"

              
            >
              New Agent User Menu
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
              noDataComponent="No Records of Agent User Menu"
              highlightOnHover
              paginationRowsPerPageOptions={[10, 50, 100, 500, 1000]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};