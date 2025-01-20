import { Axios } from "../api/Axios.ts";

interface LoginResponse {
  accessToken: string; // 서버에서 반환하는 액세스 토큰의 구조에 따라 수정
  refreshToken?: string; // 만약 리프레시 토큰도 반환된다면 추가
  user?: {
    id: string;
    email: string;
    [key: string]: any; // 유저 데이터 구조에 맞게 세부 필드 추가 가능
  };
}

interface LoginError {
  message: string;
  statusCode?: number;
  [key: string]: any; // 에러 객체의 추가적인 필드를 정의 가능
}

/**
 * 사용자 로그인 요청 함수
 * @param email - 사용자 이메일
 * @param password - 사용자 비밀번호
 * @returns 로그인 성공 시 서버에서 반환된 데이터 (액세스 토큰 등)
 * @throws 로그인 실패 시 에러 메시지
 */
export const LoginPost = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await Axios.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error);
    const errorMessage: LoginError = {
      message:
        error.response?.data?.message || "알 수 없는 에러가 발생했습니다.",
      statusCode: error.response?.status,
    };
    throw errorMessage;
  }
};
