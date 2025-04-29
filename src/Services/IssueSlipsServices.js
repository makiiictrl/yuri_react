import axios from "axios";

//For Index
export const getIssueSlips = async () => {
  return axios.get("http://localhost:3000/issue_slips");
};

// For Search in Index
export const getItems = (args) => {
  return axios.get(`http://localhost:3000/issue_slips`, {
    params: args,
  });
};

// For Request Number Lists
export const requestNumberLookUp = () => {
  return axios.get(
    "http://localhost:3000/api/sample_slip_issuances_request_number_list"
  );
};

// For Request Number Details Look up
export const requestNumberDetailsLookUp = async (request_number) => {
  return axios.get(
    `http://localhost:3000/api/sample_slip_issuances_load_request/${request_number}`
  );
};

// For showing of request slip details
export const requestSlipDetails = async (slip_request_id) => {
  return axios.get(
    `http://localhost:3000/api/sample_slip_issuances_load_request_details/${slip_request_id}`
  );
};

export const saveItem = (data) => {
  const { issue_slip } = data;
  if (issue_slip && issue_slip.id) {
    return axios.put(
      `http://localhost:3000/issue_slips/${issue_slip.id}`,
      data
    );
  } else {
    return axios.post(
      `http://localhost:3000/issue_slips`,
      data
    );
  }
};

export const deleteIssueSlip= async (id) => {
  return axios.delete(`${API_BASE_URL}/issue_slips/${id}`);
};
