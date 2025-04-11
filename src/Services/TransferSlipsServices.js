import axios from 'axios';
export const getTransferSlips = (args) => {
    return axios.get(
        `${API_BASE_URL}/transfer_slips`,
        {
            params: args
        }
    );
}

export const updateTransferSlip = (id, data) => {
    return axios.put(
        `${API_BASE_URL}/transfer_slips/${id}`,
        data
    );
}

export const deleteTransferSlip = (id) => {
    return axios.delete(
        `${API_BASE_URL}/transfer_slips/${id}`
    );
}