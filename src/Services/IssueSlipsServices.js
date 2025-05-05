// src/Services/IssueSlipServices.js
import axiosInstance from "../Login/ApiLogin";

// Fetch all issue slips
export const getIssueSlips = () =>
  axiosInstance().get("/issue_slips");

// Fetch issue slips with search params
export const getItems = (args) =>
  axiosInstance().get("/issue_slips", { params: args });

// Lookup request number list
export const requestNumberLookUp = () =>
  axiosInstance().get("/api/sample_slip_issuances_request_number_list");

// Lookup request number details
export const requestNumberDetailsLookUp = (request_number) =>
  axiosInstance().get(
    `/api/sample_slip_issuances_load_request/${request_number}`
  );

// Fetch request slip details by slip_request_id
export const requestSlipDetails = (slip_request_id) =>
  axiosInstance().get(
    `/api/sample_slip_issuances_load_request_details/${slip_request_id}`
  );

// Create or update an issue slip
export const saveItem = (data) => {
  const { issue_slip } = data;
  return issue_slip && issue_slip.id
    ? axiosInstance().put(`/issue_slips/${issue_slip.id}`, data)
    : axiosInstance().post("/issue_slips", data);
};

// Delete an issue slip by ID
export const deleteIssueSlip = (id) =>
  axiosInstance().delete(`/issue_slips/${id}`);
