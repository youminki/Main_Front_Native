import { Axios } from '../Axios';

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  gender: string;
  instagramId: string;
  agreeToTerms: boolean;
  agreeToPrivacyPolicy: boolean;
  personalWebpage: string;
  height: number;
  weight: number;
  topSize: string;
  dressSize: string;
  bottomSize: string;
  preferredBrands: string[];
  shoulderWidth?: number;
  chestCircumference?: number;
  waistCircumference?: number;
  sleeveLength?: number;
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

export const signUpUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const response = await Axios.post('/user', data);
  return response.data;
};

export const getUsers = async (
  limit?: number,
  page?: number
): Promise<GetUsersResponse> => {
  const response = await Axios.get('/user', {
    params: { limit, page },
  });
  return response.data;
};

export const getUserByEmail = async (email: string): Promise<UserDetail> => {
  const response = await Axios.get(`/user/${email}`);
  return response.data;
};

export const deleteUser = async (email: string): Promise<MessageResponse> => {
  const response = await Axios.delete(`/user/${email}`);
  return response.data;
};

export const getBlockedUsers = async (
  limit?: number,
  page?: number
): Promise<GetBlockedUsersResponse> => {
  const response = await Axios.get('/user/blocked', {
    params: { limit, page },
  });
  return response.data;
};

export const checkWebpage = async (
  personalWebpage: string
): Promise<AvailabilityResponse> => {
  const response = await Axios.get('/user/check-webpage', {
    params: { personalWebpage },
  });
  return response.data;
};

export const checkNickname = async (
  nickname: string
): Promise<AvailabilityResponse> => {
  const response = await Axios.get('/user/check-nickname', {
    params: { nickname },
  });
  return response.data;
};

export const verifyPhone = async (
  data: VerifyPhoneRequest
): Promise<VerifyPhoneResponse> => {
  const response = await Axios.post('/user/verify-phone', data);
  return response.data;
};

export const verifyCode = async (
  data: VerifyCodeRequest
): Promise<VerifyCodeResponse> => {
  const response = await Axios.post('/user/verify-code', data);
  return response.data;
};

export const checkEmail = async (
  email: string
): Promise<AvailabilityResponse> => {
  const response = await Axios.get('/user/check-email', {
    params: { email },
  });
  return response.data;
};

export interface HeaderInfoResponse {
  nickname: string;
}

export const getHeaderInfo = async (): Promise<HeaderInfoResponse> => {
  const response = await Axios.get('/user/header-info');
  return response.data;
};

export const logoutUser = async (email: string): Promise<MessageResponse> => {
  const response = await Axios.post<MessageResponse>('/auth/logout', { email });
  return response.data;
};

// 추가: 내 스타일 조회 및 수정 API
export interface UserStyle {
  height: number;
  weight: number;
  topSize: string;
  dressSize: string;
  bottomSize: string;
  preferredBrands: string[];
  shoulderWidth: number;
  chestCircumference: number;
  waistCircumference: number;
  sleeveLength: number;
}

/**
 * 내 스타일 조회
 */
export const getUserStyle = async (): Promise<UserStyle> => {
  const response = await Axios.get<UserStyle>('/user/style');
  return response.data;
};

/**
 * 내 스타일 수정
 * @param data 수정할 스타일 정보
 */
export const updateUserStyle = async (
  data: Partial<UserStyle>
): Promise<UserStyle> => {
  const response = await Axios.patch<UserStyle>('/user/style', data);
  return response.data;
};
