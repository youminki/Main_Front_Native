// src/api/auth/LoginPost.ts
import { Axios } from '../Axios';

export const LoginPost = async (id: string, password: string) => {
  try {
    console.log('📤 로그인 요청 데이터:', { id, password }); // ✅ 요청 데이터 확인

    const response = await Axios.post(
      '/auth/login',
      { id, password }, // ✅ API 명세서에 맞게 "id"와 "password" 전달
      {
        headers: { 'Content-Type': 'application/json' }, // ✅ JSON 데이터 형식 지정
      }
    );

    if (response.status === 200) {
      console.log('✅ 로그인 성공:', response.data);
      return response.data; // { accessToken, refreshToken }
    } else {
      throw new Error('로그인 실패');
    }
  } catch (error: any) {
    console.error(
      '❌ 로그인 요청 실패:',
      error.response?.data || error.message
    );

    // ✅ 401 에러일 경우 사용자에게 명확한 메시지 전달
    if (error.response?.status === 401) {
      throw { message: '잘못된 사용자 ID 또는 비밀번호입니다.' };
    }

    throw error.response?.data || { message: '로그인 요청에 실패했습니다.' };
  }
};
