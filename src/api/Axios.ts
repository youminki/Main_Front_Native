// src/api/Axios.ts
import axios from 'axios';
import Cookies from 'js-cookie';

export const Axios = axios.create({
  baseURL: 'https://api.stylewh.com',
  withCredentials: true, // 세션 쿠키 전송
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 로그인 시 저장된 accessToken이 있다면 기본 헤더로 설정
const accessToken = Cookies.get('accessToken');
if (accessToken) {
  Axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
}

// 401 응답 인터셉터: 리프레시 토큰으로 재발급 시도
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) throw new Error('No refresh token.');

        const { data } = await axios.post(
          'https://api.stylewh.com/auth/refresh',
          { refreshToken }
        );
        Cookies.set('accessToken', data.accessToken, { secure: true });
        Axios.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return Axios(originalRequest);
      } catch {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
