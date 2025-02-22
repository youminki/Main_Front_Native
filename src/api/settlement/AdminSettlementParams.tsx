import { Axios } from '../Axios';

interface AdminSettlementParams {
  status?: string;
  limit?: number;
  page?: number;
}

export const getAdminSettlementList = async (
  params?: AdminSettlementParams
) => {
  try {
    const response = await Axios.get('/settlement', { params });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || '관리자 정산 내역 조회 실패';
  }
};
