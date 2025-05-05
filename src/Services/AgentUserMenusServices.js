// src/Services/AgentUserMenusServices.js
import axiosInstance from "../Login/ApiLogin";

// Fetch all menus
export const getAgentUserMenus = () =>
  axiosInstance().get("/agent_user_menus");

// Fetch with search params
export const getItems = (args) =>
  axiosInstance().get("/agent_user_menus", { params: args });

// Lookup available menu IDs
export const menuIdLookUp = () =>
  axiosInstance().get("/agent_user_menus/menu_id_lookup");

// Lookup available agent IDs
export const agentIdLookUp = () =>
  axiosInstance().get("/agent_user_menus/agent_id_lookup");

// Show a single menu by ID
export const showAgentUserMenus = (id) =>
  axiosInstance().get(`/agent_user_menus/${id}`);

// Edit (replace) a menu
export const editAgentUserMenu = (id, data) =>
  axiosInstance().put(`/agent_user_menus/edit/${id}`, data);

// Delete a menu
export const deleteAgentUserMenu = (id) =>
  axiosInstance().delete(`/agent_user_menus/${id}`);

// Create a new menu
export const createAgentUserMenu = (data) =>
  axiosInstance().post("/agent_user_menus", data);

// Save (create or update) a menu record
export const saveItem = (data) =>
  data.id
    ? axiosInstance().put(`/agent_user_menus/${data.id}`, data)
    : axiosInstance().post("/agent_user_menus", data);
