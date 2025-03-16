import { Axios } from '../Axios';

// =====================
// 인터페이스 정의
// =====================

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthdate: string; // YYYY-MM-DD 형식
  address: string;
  phoneNumber: string;
  gender: string;
  instagramId: string;
  agreeToTerms: boolean;
  agreeToPrivacyPolicy: boolean;
}

export interface SignupResponse {
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  gender: string;
  isComplete: boolean;
}

export interface UserListItem {
  email: string;
  nickname: string;
  phoneNumber: string;
  gender: string;
}

export interface GetUsersResponse {
  users: UserListItem[];
  total: number;
}

export interface UserDetail {
  email: string;
  nickname: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  gender: string;
  instagramId: string;
}

export interface MessageResponse {
  message: string;
}

export interface BlockedUser extends UserListItem {
  status: string;
}

export interface GetBlockedUsersResponse {
  users: BlockedUser[];
  total: number;
}

export interface AvailabilityResponse {
  isAvailable: boolean;
}

export interface VerifyPhoneRequest {
  phoneNumber: string;
}

export interface VerifyPhoneResponse {
  message: string;
}

export interface VerifyCodeRequest {
  phoneNumber: string;
  code: string;
}

export interface VerifyCodeResponse {
  message: string;
}

// =====================
// API 호출 함수
// =====================

// 회원가입 API 호출 (POST /user)
// 휴대폰 인증(verify-code API)을 먼저 진행한 경우에만 회원가입이 가능합니다.
export const signUpUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  try {
    const response = await Axios.post('/user', data);
    return response.data;
  } catch (error: any) {
    // 서버에서 휴대폰 인증 미완료 시 400 응답을 반환하는 경우
    if (error.response && error.response.status === 400) {
      throw new Error('휴대폰 인증을 먼저 진행해주세요.');
    }
    throw error;
  }
};

// 모든 사용자 조회 API 호출 (GET /user)
export const getUsers = async (
  limit?: number,
  page?: number
): Promise<GetUsersResponse> => {
  const response = await Axios.get('/user', {
    params: { limit, page },
  });
  return response.data;
};

// 이메일로 사용자 조회 API 호출 (GET /user/{email})
export const getUserByEmail = async (email: string): Promise<UserDetail> => {
  const response = await Axios.get(`/user/${email}`);
  return response.data;
};

// 사용자 삭제 API 호출 (DELETE /user/{email})
export const deleteUser = async (email: string): Promise<MessageResponse> => {
  const response = await Axios.delete(`/user/${email}`);
  return response.data;
};

// 차단된 사용자 조회 API 호출 (GET /user/blocked)
export const getBlockedUsers = async (
  limit?: number,
  page?: number
): Promise<GetBlockedUsersResponse> => {
  const response = await Axios.get('/user/blocked', {
    params: { limit, page },
  });
  return response.data;
};

// 개인 웹페이지 주소 중복 체크 API 호출 (GET /user/check-webpage)
export const checkWebpage = async (
  personalWebpage: string
): Promise<AvailabilityResponse> => {
  const response = await Axios.get('/user/check-webpage', {
    params: { personalWebpage },
  });
  return response.data;
};

// 닉네임 중복 체크 API 호출 (GET /user/check-nickname)
export const checkNickname = async (
  nickname: string
): Promise<AvailabilityResponse> => {
  const response = await Axios.get('/user/check-nickname', {
    params: { nickname },
  });
  return response.data;
};

// 휴대폰 인증 요청 API 호출 (POST /user/verify-phone)
export const verifyPhone = async (
  data: VerifyPhoneRequest
): Promise<VerifyPhoneResponse> => {
  const response = await Axios.post('/user/verify-phone', data);
  return response.data;
};

// 휴대폰 인증 코드 검증 API 호출 (POST /user/verify-code)
export const verifyCode = async (
  data: VerifyCodeRequest
): Promise<VerifyCodeResponse> => {
  const response = await Axios.post('/user/verify-code', data);
  return response.data;
};

// =====================
// (추가) 이메일 중복 체크 API 호출 (GET /user/check-email)
// =====================
export const checkEmail = async (
  email: string
): Promise<AvailabilityResponse> => {
  const response = await Axios.get(`/user/check-email`, {
    params: { email },
  });
  return response.data;
};
