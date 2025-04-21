import axios from "axios";


export const getAgents = (args) => {
  return axios.get(
  `${API_BASE_URL}/agents`,
  {
      params: args
  }
);
}

export const saveAgent = (agent) => {
  return axios.post(`${API_BASE_URL}/agents`, { agent });
};

export const deleteAgent = (id) => {
  return axios.delete(`${API_BASE_URL}/agents/${id}`);
}

export const updateAgent = (id, agentData) => {
  return axios.patch(`${API_BASE_URL}/agents/${id}`, { agent: agentData });
};
