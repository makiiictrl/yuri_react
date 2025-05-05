// ApiLogin.js
import axios from 'axios';

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  instance.interceptors.request.use(
    (config) => {
      // 1) Always tell Rails it's JSON
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';

      // 2) Then, if we have a token, attach it
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = token;
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
