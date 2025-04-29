import axios from "axios";

export const saveTransferSlips = (data) => {
    return axios.post(
        `${API_BASE_URL}/inventories`,
        data
    );
}