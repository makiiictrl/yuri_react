import axios from 'axios';

export default () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
  });

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

  return instance;
};
