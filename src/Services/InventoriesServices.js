import axios from "axios";

export const saveItem = (payload) => {
  if (payload.id) {
    return axios.put(
      `http://localhost:3000/inventories/${payload.id}`,
      payload
    );
  } else {
    return axios.post("http://localhost:3000/inventories", payload);
  }
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
