import axios from `axios`;



//For Index
export const getAgentUserMenus = async () => {
  return axios.get(`${API_BASE_URL}/agent_user_menus`);
};

// For Search in Index
export const getItems = (args) => {
    return axios.get(
    `${API_BASE_URL}/agent_user_menus`,
    {
        params: args
    }
);
}

export const menuIdLookUp = () => {
  return axios.get(`${API_BASE_URL}/agent_user_menus/menu_id_lookup`);
};

// For Edit
export const showAgentUserMenus = (id) => {
  return axios.get(`${API_BASE_URL}/agent_user_menus/${id}`);
};

export const editAgentUserMenu = async (id, data) => {
  return axios.put(`/agent_user_menus/edit/${id}`, data);
};

export const deleteAgentUserMenu = async (id) => {
  return axios.delete(`${API_BASE_URL}/agent_user_menus/${id}`);
};

export const createAgentUserMenu = async (data) => {
  return axios.post(`/agent_user_menus`, data);
};

export const saveItem = (data) => {
  if (data.id) {
    return axios.put(
      `${API_BASE_URL}/agent_user_menus/${data.id}`,
      data
    );
  } else {
    return axios.post(`${API_BASE_URL}/agent_user_menus`, data);
  }
}
