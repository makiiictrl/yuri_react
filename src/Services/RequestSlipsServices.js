import axios from "axios";

//For Index
export const getRequestSlips = async () => {
    return axios.get("http://localhost:3000/request_slips");
};

// For Search in Index
export const getItems = (args) => {
    return axios.get(
    `http://localhost:3000/request_slips`,
    {
        params: args
    }
);
}

// For employee Name Look up
export const employeeNameLookUp = () => {
    return axios.get("http://localhost:3000/request_slips/employee_name_look_up");
};

// For customer Name Look up
export const customerNameLookUp = () => {
    return axios.get("http://localhost:3000/request_slips/customer_name_look_up");
};

// For Product Description Look up
export const productDescriptionLookUp = () => {
  return axios.get("http://localhost:3000/api/sample_inventory_lookup_sample_item_master");
};

// For employee autofilled
export const employeeAutoFilled = async (id) => {
    return axios.get("http://localhost:3000/request_slips/employee_auto_filled?", { params: { id } });
};

// For customer autofilled
export const customerAutoFilled = async (customer_code) => {
  return axios.get(`http://localhost:3000/api/customers_index/${customer_code}`);
};

// Fetch Territory Code
export const fetchTerritories = (employeeNumber) => {
    return axios.get(`http://localhost:3000/api/sarf_details_territory_code/${employeeNumber}`);
  };

// Fetch Territory Code
export const fetchTeam = (employeeNumber) => {
  return axios.get(`http://localhost:3000/api/sarf_details_employee_team/${employeeNumber}`);
};

export const saveItem = (data) => {
    if (data.id) {
      return axios.put(
        `http://localhost:3000/request_slips/${data.id}`,
        data
      );
    } else {
      return axios.post(`http://localhost:3000/request_slips`, data);
    }
  }

export const deleteRequestSlip = async (id) => {
  return axios.delete(`http://localhost:3000/request_slips/${id}`);
};

// For Edit
export const showRequestSlip = (id) => {
  return axios.get(`http://localhost:3000/request_slips/${id}`);
};