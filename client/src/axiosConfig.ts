import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

// Add a request interceptor to include the JWT token in the Authorization header
axiosInstance.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
