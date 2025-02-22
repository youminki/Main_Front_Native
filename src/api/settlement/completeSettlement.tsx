import { Axios } from '../Axios';

export const completeSettlement = async (settlementId: number) => {
  try {
    const response = await Axios.post(`/settlement/complete/${settlementId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || '정산 완료 처리 실패';
  }
};
