import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_LINK
})

api.interceptors.request.use(
    config => {
        if (localStorage.getItem('auth')) {
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;