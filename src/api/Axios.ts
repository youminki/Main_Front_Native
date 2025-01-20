import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://api.stylewh.com',
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (window.location.pathname === 'auth/login') {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
