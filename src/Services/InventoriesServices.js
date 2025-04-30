import axios from "axios";

export const saveTransferSlips = (data) => {
  return axios.post(`${API_BASE_URL}/inventories`, data);
};

export const documentNumberLookUp = async (document_type) => {
  const baseUrl =
    "http://localhost:3000/api/inventories_lookup_document_number";
  // if document_type is null, undefined, or an empty string, omit the segment
  const url =
    document_type && document_type.toString().trim() !== ""
      ? `${baseUrl}/${document_type}`
      : baseUrl;

  return axios.get(url);
};

// For Request Number Details Look up
export const inventoryDetailsLookUp = async (document_number) => {
  return axios.get(
    `http://localhost:3000/api/inventories_lookup_document_details/${document_number}`
  );
};

// For Request Number Details Look up
export const documentDateLookUp = async (document_type, document_number, company_code ) => {
  return axios.get(
    `http://localhost:3000/api/inventories_lookup_document_date/${document_type}/${document_number}/${company_code}`
  );
};

// For Request Number Details Look up
export const inventoryItemDetailsLookup = async (document_type, document_number, company_code ) => {
  return axios.get(
    `http://localhost:3000/api/inventories_lookup_inventory_items/${document_type}/${document_number}/${company_code}`
  );
};
