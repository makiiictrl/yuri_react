import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { showTransferSlip } from "../../Services/TransferSlipsServices";
import { LOAD_COMPANY_CODE_SELECT } from "../../Config/CompanyCodes";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d) ? "" : d.toLocaleDateString("en-US");
};

const formatNumber = (num) => {
  if (num == null) return "";
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function TransferSlipInfo() {
  const { id } = useParams();
  const [transferSlip, setTransferSlip] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No Transfer Slip ID provided");
      setLoading(false);
      return;
    }

    showTransferSlip(id)
      .then((response) => {
        const data = response.data;
        setTransferSlip(data.transfer_slip);
        setDetails(data.details || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Failed to load transfer slip");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!transferSlip) return <div>No transfer slip found</div>;

  const infoData = [
    { field: 'Company', value: LOAD_COMPANY_CODE_SELECT[transferSlip.company_code?.toString()] },
    { field: 'TS Number', value: transferSlip.transfer_slip_number },
    { field: 'TS Type', value: transferSlip.transfer_slip_type },
    { field: 'TO', value: LOAD_COMPANY_CODE_SELECT[transferSlip.transfer_to?.toString()] },
    { field: 'Transferred', value: `${transferSlip.transferred_by} : ${formatDate(transferSlip.transferred_by_date)}` },
    { field: 'Received', value: `${transferSlip.received_by} : ${formatDate(transferSlip.received_by_date)}` },
  ];

  const infoColumns = [
    { name: 'Field', selector: row => row.field, sortable: false },
    { name: 'Value', selector: row => row.value, sortable: false },
  ];

  const detailColumns = [
    { name: 'ITEMS', selector: row => row.product_description, sortable: true },
    { name: 'LOT NUMBER', selector: row => row.lot_number, sortable: true },
    { name: 'MFG. DATE', selector: row => formatDate(row.manufacturing_date), sortable: true },
    { name: 'EXP DATE', selector: row => formatDate(row.expiry_date), sortable: true },
    { name: 'QUANTITY', selector: row => formatNumber(row.quantity), right: true, sortable: true },
    { name: 'J.O. NO.', selector: row => row.job_order_number, sortable: true },
    { name: 'REMARKS', selector: row => row.remarks, sortable: false },
  ];

  // Custom styles to hide the column header row for the info DataTable
  const infoStyles = {
    headRow: {
      style: {
        display: 'none',
      },
    },
  };

  return (
    <div className="page-body">
      <div className="col-sm-12">
        <div className="card title-line">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <i className="icofont icofont-paper-plane me-2 text-dark"></i>
              Transfer Slip Information
            </h2>
          </div>
          <div className="card-body">
            <DataTable
              columns={infoColumns}
              data={infoData}
              noHeader
              pagination={false}
              highlightOnHover
              dense
              customStyles={infoStyles}
            />

            <h5 className="mt-4">Details</h5>
            <DataTable
              columns={detailColumns}
              data={details}
              defaultSortField="product_description"
              pagination={false}
              highlightOnHover
              dense
            />

            <div className="d-flex justify-content-between mt-3">
              <Link to="/transfer_slips" className="btn btn-secondary btn-sm">Back</Link>
              <Link to={`/transfer_slips/edit/${id}`} className="btn btn-warning btn-sm">Edit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
