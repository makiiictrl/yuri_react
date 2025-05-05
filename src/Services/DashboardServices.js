// DashboardServices.js
import axiosInstance from "../Login/ApiLogin";

export const getAgents = (args) =>
  axiosInstance().get("/agents", { params: args });

export const saveAgent = (agent) =>
  axiosInstance().post("/agents", { agent });

export const deleteAgent = (id) =>
  axiosInstance().delete(`/agents/${id}`);

export const updateAgent = (id, agentData) =>
  axiosInstance().patch(`/agents/${id}`, { agent: agentData });
