/**
 * axios setup to use mock service
 */
import axios from 'axios';

const { REACT_APP_SERVER_API_SIGSEG, REACT_APP_SERVER_API_SEGURGO } = process.env;

const axiosServices = axios.create({
    baseURL: REACT_APP_SERVER_API_SIGSEG
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Servicios incorrectos')
);

export const axiosSegurgo = axios.create({
    baseURL: REACT_APP_SERVER_API_SEGURGO
});

// interceptor for http
axiosSegurgo.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Servicios incorrectos')
);

export const axiosFiles = axios.create({
    baseURL: REACT_APP_SERVER_API_SIGSEG,
    responseType: 'arraybuffer'
});

export const axiosPdf = axios.create({
    baseURL: REACT_APP_SERVER_API_SIGSEG,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// interceptor for http
axiosFiles.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Servicios incorrectos')
);

export default axiosServices;
