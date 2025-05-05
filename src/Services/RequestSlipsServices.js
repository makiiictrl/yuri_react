// src/Services/RequestSlipsServices.js
import axiosInstance from "../Login/ApiLogin";

// Fetch all request slips
export const getRequestSlips = () =>
  axiosInstance().get("/request_slips");

// Fetch request slips with optional search params
export const getItems = (args) =>
  axiosInstance().get("/request_slips", { params: args });

// Employee name lookup
export const employeeNameLookUp = () =>
  axiosInstance().get("/request_slips/employee_name_look_up");

// Customer name lookup
export const customerNameLookUp = () =>
  axiosInstance().get("/request_slips/customer_name_look_up");

// Sample description lookup
export const productSampleDescriptionLookUp = () =>
  axiosInstance().get("/api/sample_inventory_lookup_sample_item_master");

// Promats description lookup
export const productPromatsDescriptionLookUp = () =>
  axiosInstance().get("/api/sample_inventory_lookup_promats_item_master");

// Packmats description lookup
export const productPackmatsDescriptionLookUp = () =>
  axiosInstance().get("/api/sample_inventory_lookup_packmats_item_master");

// Commercial description lookup
export const productCommercialDescriptionLookUp = () =>
  axiosInstance().get("/api/sample_inventory_lookup_commercial_item_master");

// Employee autofill by ID
export const employeeAutoFilled = (id) =>
  axiosInstance().get("/request_slips/employee_auto_filled", { params: { id } });

// Customer autofill by code
export const customerAutoFilled = (customer_code) =>
  axiosInstance().get(`/api/customers_index/${customer_code}`);

// Territory code lookup
export const fetchTerritories = (employeeNumber) =>
  axiosInstance().get(`/api/sarf_details_territory_code/${employeeNumber}`);

// Team lookup
export const fetchTeam = (employeeNumber) =>
  axiosInstance().get(`/api/sarf_details_employee_team/${employeeNumber}`);

// Create or update a request slip
export const saveItem = (data) => {
  const payload = { request_slip: data };
  return data.id
    ? axiosInstance().put(`/request_slips/${data.id}`, payload)
    : axiosInstance().post("/request_slips", payload);
};

// Delete a request slip
export const deleteRequestSlip = (id) =>
  axiosInstance().delete(`/request_slips/${id}`);

// Show a single request slip
export const showRequestSlip = (id) =>
  axiosInstance().get(`/request_slips/${id}`);
