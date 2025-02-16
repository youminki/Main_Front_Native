// src/api/Axios.ts
import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://api.stylewh.com',
  withCredentials: true, // ✅ 쿠키 포함 (세션 관리 가능)
  headers: {
    'Content-Type': 'application/json', // ✅ JSON 명확하게 지정
    Accept: 'application/json',
  },
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('🔥 API 요청 실패:', error.response);

    if (error.response?.status === 401) {
      console.warn('⚠️ 인증 실패 - 다시 로그인 필요');
      return Promise.reject({
        message: '잘못된 사용자 ID 또는 비밀번호입니다.',
      });
    }

    return Promise.reject(error);
  }
);
