import axios from "axios";

//For Index
export const getAgentUserMenus = async () => {
  return axios.get("http://localhost:3000/agent_user_menus");
};

// For Search in Index
export const getItems = (args) => {
    return axios.get(
    `http://localhost:3000/agent_user_menus`,
    {
        params: args
    }
);
}

// For Edit
export const showAgentUserMenus = (id) => {
  return axios.get(`http://localhost:3000/agent_user_menus/${id}`);
};

export const editAgentUserMenu = async (id, data) => {
  return axios.put(`/agent_user_menus/edit/${id}`, data);
};

export const deleteAgentUserMenu = async (id) => {
  return axios.delete(`http://localhost:3000/agent_user_menus/${id}`);
};

export const createAgentUserMenu = async (data) => {
  return axios.post("/agent_user_menus", data);
};

export const saveItem = (data) => {
  if (data.id) {
    return axios.put(
      `http://localhost:3000/agent_user_menus/${data.id}`,
      data
    );
  } else {
    return axios.post(`http://localhost:3000/agent_user_menus`, data);
  }
};
