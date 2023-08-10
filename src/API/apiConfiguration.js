import axios from "axios";
import AuthService from "./AuthService";

export const publicApi = axios.create({
    baseURL: process.env.REACT_APP_API_LINK
})

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

api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await AuthService.refreshToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return api(originalRequest);
    }
    return Promise.reject(error);
});

export default api;

