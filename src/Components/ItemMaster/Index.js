import React, { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getItemMasters, getItems, deleteItemMaster } from "../../Services/ItemMastersServices";

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
  
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
          deleteItemMaster(id)
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
      getItemMasters()
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
        width: "10%",
        whiteSpace: "nowrap",
        center: true,
      },
  
      {
        name: <b>Item Class</b>,
        selector: (row) => row.item_class,
        width: "10%",
        whiteSpace: "nowrap",
        // center: true,
        sortable: true,
      },
  
      {
        name: <b>Item Code</b>,
        selector: (row) => row.item_code,
        width: "10%",
        whiteSpace: "nowrap",
        // center: true,
        sortable: true,
      },
  
      {
        name: <b>Item Description</b>,
        selector: (row) => row.item_description,
        width: "35%",
        whiteSpace: "nowrap",
        // center: true,
        sortable: true,
      },
  
      {
        name: <b>Unit of Measure</b>,
        selector: (row) => row.unit_of_measure,
        width: "10%",
        whiteSpace: "nowrap",
        // center: true,
        sortable: true,
      },
  
      {
        name: <b>Packsize</b>,
        selector: (row) => row.pack_size,
        width: "10%",
        whiteSpace: "nowrap",
        // center: true,
        sortable: true,
      },
  
      {
        name: <b>Team</b>,
        selector: (row) => row.team,
        width: "8%",
        whiteSpace: "nowrap",
        // center: true,
        sortable: true,
      },

      {
        name: <b>Actions</b>,
        width: "5%",
        cell: (row) => (
          <div className="action">
            <Link to={`/item_masters/edit/${row.id}`}>
              <i className="icon-pencil-alt text-info"></i>
            </Link>
            <button
              onClick={() => handleDelete(row.id)}
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

    return(
        <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
          <i className="icofont icofont-document-folder me-2 text-dark"></i> 
            Item Masters
          </h2>
          <div className="d-flex align-items-center">
            <div className="input-group me-2">
              <input 
                className="form-control form-control-sm" 
                type="text" 
                placeholder="Search..." 
                aria-label="Request Number"
                onInput={(e) => {
                setArgs({...args,
                  search: e.target.value
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
              to="/item_masters/new"

              
            >
              New Item Master
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
    )
}