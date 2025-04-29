import axios from "axios";

//For Index
export const getItemMasters = async () => {
    return axios.get("http://localhost:3000/item_masters");
};

// For Search in Index
export const getItems = (args) => {
    return axios.get(
    `http://localhost:3000/item_masters`,
    {
        params: args
    }
);
}

export const deleteItemMaster = async (id) => {
    return axios.delete(`${API_BASE_URL}/item_masters/${id}`);
  };

  //form

  export const saveItem = (data) => {
    const payload = { item_master: data };
  
    if (data.id) {
      return axios.put(
        `http://localhost:3000/item_masters/${data.id}`,
        payload
      );
    } else {
      return axios.post(
        `http://localhost:3000/item_masters`,
        payload
      );
    }
  };
  