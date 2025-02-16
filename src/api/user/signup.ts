import { Axios } from '../../api/Axios';

interface SignupData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  gender: string;
  instagramId?: string;
  agreeToTerms: boolean;
  agreeToPrivacyPolicy: boolean;
}

export const signupUser = async (data: SignupData) => {
  try {
    const response = await Axios.post('/user', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
