// src/Services/TransferSlipServices.js
import axiosInstance from "../Login/ApiLogin";

// Fetch all transfer slips, with optional query params
export const getTransferSlips = (args) =>
  axiosInstance().get("/transfer_slips", { params: args });

// Update a transfer slip
export const updateTransferSlip = (id, data) =>
  axiosInstance().put(`/transfer_slips/${id}`, data);

// Delete a transfer slip
export const deleteTransferSlip = (id) =>
  axiosInstance().delete(`/transfer_slips/${id}`);

// Show a single transfer slip
export const showTransferSlip = (id) =>
  axiosInstance().get(`/transfer_slips/${id}`);

// Create a new transfer slip
export const saveTransferSlips = (data) =>
  axiosInstance().post("/transfer_slips", data);

// Fetch warehouse personnels for select menus
export async function fetchWarehousePersonnels() {
  const res = await axiosInstance().get("/api/warehouse_personnels", {
    params: { format: "json" },
  });
  return res.data;
}

// Fetch lot number options
export async function fetchLotNumberOptions() {
  const res = await axiosInstance().get("/api/lookups_inventorytransaction", {
    params: { format: "json" },
  });
  return res.data;
}

// Fetch product description list
export async function fetchProductDescriptionOptions() {
  const res = await axiosInstance().get("/api/products", {
    params: { format: "json", company_filter: false },
  });
  return res.data;
}

// Lookup product info by lot number
export async function fetchProductByLot(lotNumber) {
  const res = await axiosInstance().get("/api/lookups_inventorytransaction", {
    params: { lot_number: lotNumber },
  });
  return res.data;
}

// Lookup dates by lot & SKU
export async function fetchDatesByLotAndSku(lotNumber, productSku) {
  const res = await axiosInstance().get("/api/lookups_inventorytransaction", {
    params: { lot_number: lotNumber, product_sku: productSku },
  });
  return res.data;
}

// Fetch next slip numbers
export async function fetchNextSlipNumbers() {
  const res = await axiosInstance().get("/api/lookups_next_slip_numbers", {
    params: { format: "json" },
  });
  return res.data.next_slip_numbers;
}

// (Optional) fetch a single slip for printing via JSON
export function fetchTransferSlip(id) {
  return axiosInstance().get(`/transfer_slips/${id}`, {
    params: { format: "json" },
  });
}

// Get JSON list for prints
export function getTransferSlipsPrint(params = {}) {
  return axiosInstance().get("/transfer_slips.json", { params });
}

export function getTransferSlipByIdPrint(id) {
  return axiosInstance().get(`/transfer_slips/${id}.json`);
}

// Download blank PDF slip
export function getBlankTransferSlipPdf(companyCode) {
  return axiosInstance().get("/transfer_slips/print.pdf", {
    params: {
      transfer_slips_type: "blank",
      choose_company_code: companyCode,
    },
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
  });
}

// Download specific slip PDF by ID
export function getTransferSlipPdfById(transferSlipId) {
  return axiosInstance().get(`/transfer_slips/${transferSlipId}/print.pdf`, {
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
  });
}
