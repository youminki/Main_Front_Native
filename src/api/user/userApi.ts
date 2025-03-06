import { Axios } from '../Axios';

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

// 사용자 정보 업데이트 요청 인터페이스
export interface UpdateUserRequest {
  nickname?: string;
  address?: string;
  phoneNumber?: string;
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

// 이메일 중복 체크 응답 인터페이스
export interface CheckEmailResponse {
  isAvailable: boolean;
}

// 이름과 생년월일로 이메일 찾기 응답 인터페이스
export interface FindEmailResponse {
  email: string;
}

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

// 사용자 정보 업데이트 API 호출 (PUT /user/{email})
export const updateUser = async (
  email: string,
  data: UpdateUserRequest
): Promise<MessageResponse> => {
  const response = await Axios.put(`/user/${email}`, data);
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

// 이메일 중복 체크 API 호출 (GET /user/check-email)
export const checkEmail = async (
  email: string
): Promise<CheckEmailResponse> => {
  const response = await Axios.get('/user/check-email', {
    params: { email },
  });
  return response.data;
};

// 이름과 생년월일로 이메일 찾기 API 호출 (GET /user/find-email)
export const findEmail = async (
  name: string,
  birthdate: string
): Promise<FindEmailResponse> => {
  const response = await Axios.get('/user/find-email', {
    params: { name, birthdate },
  });
  return response.data;
};
