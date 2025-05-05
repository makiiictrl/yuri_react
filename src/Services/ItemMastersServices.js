// src/Services/ItemMasterServices.js
import axiosInstance from "../Login/ApiLogin";

// Fetch all item masters
export const getItemMasters = () =>
  axiosInstance().get("/item_masters");

// Fetch item masters with search params
export const getItems = (args) =>
  axiosInstance().get("/item_masters", { params: args });

// Delete an item master by ID
export const deleteItemMaster = (id) =>
  axiosInstance().delete(`/item_masters/${id}`);

// Create or update an item master
export const saveItem = (data) => {
  const payload = { item_master: data };

  return data.id
    ? axiosInstance().put(`/item_masters/${data.id}`, payload)
    : axiosInstance().post("/item_masters", payload);
};
