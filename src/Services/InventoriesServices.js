// src/Services/InventoryServices.js
import axiosInstance from "../Login/ApiLogin";

// Create or update an inventory record
export const saveItem = (payload) =>
  payload.id
    ? axiosInstance().put(`/inventories/${payload.id}`, payload)
    : axiosInstance().post("/inventories", payload);

// Lookup document numbers (optionally filtered by type)
export const documentNumberLookUp = (document_type) => {
  const basePath = "/api/inventories_lookup_document_number";
  const url =
    document_type && document_type.toString().trim() !== ""
      ? `${basePath}/${document_type}`
      : basePath;
  return axiosInstance().get(url);
};

// Lookup document details by document number
export const inventoryDetailsLookUp = (document_number) =>
  axiosInstance().get(
    `/api/inventories_lookup_document_details/${document_number}`
  );

// Lookup document dates by type, number, and company code
export const documentDateLookUp = (document_type, document_number, company_code) =>
  axiosInstance().get(
    `/api/inventories_lookup_document_date/${document_type}/${document_number}/${company_code}`
  );

// Lookup inventory items by document type, number, and company code
export const inventoryItemDetailsLookup = (document_type, document_number, company_code) =>
  axiosInstance().get(
    `/api/inventories_lookup_inventory_items/${document_type}/${document_number}/${company_code}`
  );
