import axios from "axios";  

export const getAgentUserMenus = async () => {
    return axios.get("http://localhost:3000/agent_user_menus");
}

export const showAgentUserMenus = (id) => {
    return axios.get(
    `http://localhost:3000/agent_user_menus/edit/${id}`
    );
}

export const editAgentUserMenu = async (id, data) => {
    return axios.put(`/agent_user_menus/${id}`, data);
}

export const deleteAgentUserMenu = async (id) => {
    return axios.delete(`http://localhost:3000/agent_user_menus/${id}`);
}

export const createAgentUserMenu = async (data) => {
    return axios.post("/agent_user_menus", data);
}