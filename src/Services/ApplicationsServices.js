import axiosInstance from "../Login/ApiLogin";

// Lookup Header Search Document Numbers
export const documentNumberLookUp = () =>
    axiosInstance().get("/application_document_number_lookup");