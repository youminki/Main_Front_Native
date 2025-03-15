import { Axios } from '../Axios';

export const getSettlementDetail = async (settlementId: number) => {
  try {
    const response = await Axios.get(`/settlement/detail/${settlementId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || '정산 상세 조회 실패';
  }
};
