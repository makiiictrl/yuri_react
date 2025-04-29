import axios from "axios";

//For Index
export const getInventories = async () => {
  return axios.get("http://localhost:3000/inventories"), {
  headers: {
    'Authorization': `Bearer ${token}`  // Add token here
  }
};
};

// For Search in Index
export const getItems = (args) => {
  return axios.get(`http://localhost:3000/inventories`, {
    params: args,
  });
};

