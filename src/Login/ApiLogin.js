import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  // Attach token to requests
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = token;
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');

        window.location.href = '/#/login';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosInstance;
