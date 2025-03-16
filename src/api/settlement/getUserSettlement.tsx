import { Axios } from '../Axios';

export const getUserSettlement = async (email: string) => {
  try {
    const response = await Axios.get(`/settlement/${email}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || '정산 내역 조회 실패';
  }
};
