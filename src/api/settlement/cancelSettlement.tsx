import { Axios } from '../Axios';

export const cancelSettlement = async (settlementId: number) => {
  try {
    const response = await Axios.post(`/settlement/cancel/${settlementId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || '정산 취소 실패';
  }
};
