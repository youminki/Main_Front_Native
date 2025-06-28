import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Axios = axios.create({
  baseURL: 'https://api.stylewh.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 토큰 초기화
const initializeToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      Axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error('Token initialization error:', error);
  }
};

initializeToken();

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token.');

        const { data } = await axios.post(
          'https://api.stylewh.com/auth/refresh',
          { refreshToken }
        );

        await AsyncStorage.setItem('accessToken', data.accessToken);
        Axios.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return Axios(originalRequest);
      } catch {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        // React Native에서는 네비게이션을 통해 로그인 페이지로 이동
        // window.location.href 대신 navigation.reset 사용
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
