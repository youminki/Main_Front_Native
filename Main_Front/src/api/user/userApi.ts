import { Axios } from '../Axios';

// =====================
// 인터페이스 정의
// =====================

// 회원가입 요청 및 응답 인터페이스
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

// 사용자 목록 관련 인터페이스
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

// 이메일로 조회 시 사용자 상세 정보 인터페이스
export interface UserDetail {
  email: string;
  nickname: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  gender: string;
  instagramId: string;
}

// 공통 메시지 응답 인터페이스
export interface MessageResponse {
  message: string;
}

// 차단된 사용자 관련 인터페이스
export interface BlockedUser extends UserListItem {
  status: string;
}

export interface GetBlockedUsersResponse {
  users: BlockedUser[];
  total: number;
}

// 중복 여부 응답 인터페이스 (개인 웹페이지, 닉네임)
export interface AvailabilityResponse {
  isAvailable: boolean;
}

// 휴대폰 인증 관련 인터페이스
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
export const signUpUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const response = await Axios.post('/user', data);
  return response.data;
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
