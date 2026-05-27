export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getApiBaseUrl = () => {
    return API_BASE_URL;
};

const apiConfig = {
    API_BASE_URL,
};

export default apiConfig;