import axios from "axios";

export const getAgents = (args) => {
  return axios.get(
  `http://localhost:3000/agents`,
  {
      params: args
  }
);
}

export const saveAgent = (agent) => {
  return axios.post("http://localhost:3000/agents", { agent });
};

export const deleteAgent = (id) => {
  return axios.delete(`http://localhost:3000/agents/${id}`);
}

export const updateAgent = (id, agentData) => {
  return axios.patch(`http://localhost:3000/agents/${id}`, { agent: agentData });
};
