import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getItems, getInventories } from "../../Services/InventoyListingsServices";

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
          getInventories(id)
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
      getInventories()
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
          name: <b>Inventory Type</b>,
          selector: (row) => row.inventory_type,
          width: "10%",
          whiteSpace: "nowrap",
          center: true,
        },
    
        {
          name: <b>Lot No.</b>,
          selector: (row) => row.lot_number,
          width: "10%",
          whiteSpace: "nowrap",
          // center: true,
          sortable: true,
        },
    
        {
          name: <b>Product Code</b>,
          selector: (row) => row.issuance_date,
          width: "10%",
          whiteSpace: "nowrap",
          // center: true,
          sortable: true,
        },
    
        {
          name: <b>Product Description</b>,
          selector: (row) => row.item_description,
          width: "30%",
          whiteSpace: "nowrap",
          // center: true,
          sortable: true,
        },
    
        {
          name: <b>Expiry Date</b>,
          selector: (row) => row.expiry_date,
          width: "10%",
          whiteSpace: "nowrap",
          // center: true,
          sortable: true,
        },
        {
          name: <b>Balance</b>,
          selector: (row) => row.id,
          width: "10%",
          whiteSpace: "nowrap",
          // center: true,
          sortable: true,
        },
        {
          name: <b>Remarks</b>,
          selector: (row) => row.remarks,
          width: "10%",
          whiteSpace: "nowrap",
          // center: true,
          sortable: true,
        },
    
        {
          name: <b>Actions</b>,
          width: "5%",
          cell: (row) => (
            <div className="action">
              <Link to={`/inventories/edit/${row.id}`} className="d-inline-block" title="Edit">
                <i className="icon-pencil-alt text-info"></i>
              </Link>
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
              <i className="icofont icofont-list me-2 text-dark"></i>
              Inventory Listing
            </h2>
            <div className="d-flex align-items-center">
              <div className="input-group me-2">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  // onInput={(e) => {
                  //   setArgs({ ...args, search: e.target.value });
                  // }}
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
                to="/inventories/new"
              >
                New Inventory Listing
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
              noDataComponent="No Records of Inventory Listing"
              highlightOnHover
              paginationRowsPerPageOptions={[10, 50, 100, 500, 1000]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
