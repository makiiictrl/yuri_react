// src/Services/InventoryServices.js
import axiosInstance from "../Login/ApiLogin";

// Fetch all inventories
export const getInventories = () =>
  axiosInstance().get("/inventories");

// Fetch inventories with search params
export const getItems = (args) =>
  axiosInstance().get("/inventories", { params: args });
