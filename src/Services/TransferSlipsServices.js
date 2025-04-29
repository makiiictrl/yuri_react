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

export const showTransferSlip = (id) => {
    return axios.get(
        `${API_BASE_URL}/transfer_slips/${id}`
    );  
}

export const saveTransferSlips = (data) => {
    return axios.post(
        `${API_BASE_URL}/transfer_slips`,
        data
    );
}

export async function fetchWarehousePersonnels() {
    const res = await axios.get(
      `${API_BASE_URL}/api/warehouse_personnels`,
      { params: { format: 'json' } }
    );
    return res.data;
  }
  
  export async function fetchLotNumberOptions() {
    const res = await axios.get(
      `${API_BASE_URL}/api/lookups_inventorytransaction`,
      { params: { format: 'json' } }
    );
    return res.data;
  }
  
  export async function fetchProductDescriptionOptions() {
    const res = await axios.get(
      `${API_BASE_URL}/api/products`,
      { params: { format: 'json', company_filter: false } }
    );
    return res.data;
  }
  
  export async function fetchProductByLot(lotNumber) {
    const res = await axios.get(
      `${API_BASE_URL}/api/lookups_inventorytransaction`,
      { params: { lot_number: lotNumber } }
    );
    return res.data;
  }
  
  export async function fetchDatesByLotAndSku(lotNumber, productSku) {
    const res = await axios.get(
      `${API_BASE_URL}/api/lookups_inventorytransaction`,
      { params: { lot_number: lotNumber, product_sku: productSku } }
    );
    return res.data;
  }

  export async function fetchNextSlipNumbers() {
    const res = await axios.get(
      `${API_BASE_URL}/api/lookups_next_slip_numbers`,
      { params: { format: 'json' } }
    );
    return res.data.next_slip_numbers;
  }

  export function fetchTransferSlip(id) {
    return axios.get(`${API_BASE_URL}/transfer_slips/${id}`, {
      params: { format: 'json' }
    });
  }

  export function getTransferSlipByIdPrint(id) {
    return axios.get(`${API_BASE_URL}/transfer_slips/${id}.json`);
  }

  export function getTransferSlipsPrint(params = {}) {
    return axios.get(`${API_BASE_URL}/transfer_slips.json`, { params });
  }

  export function getBlankTransferSlipPdf(companyCode) {
    return axios.get(
      `${API_BASE_URL}/transfer_slips/print.pdf`,
      {
        params: {
          transfer_slips_type: "blank",
          choose_company_code: companyCode,
        },
        responseType: "blob",
        headers: {
          // tell Rails “give me PDF, not HTML”
          Accept: "application/pdf",
        },
      }
    );
  }
  
  export function getTransferSlipPdfById(transferSlipId) {
    return axios.get(
      `${API_BASE_URL}/transfer_slips/${transferSlipId}/print.pdf`,
      {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      }
    );
  }