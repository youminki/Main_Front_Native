import { Axios } from '../Axios';

interface DateRangeParams {
  startDate: string;
  endDate: string;
}

export const getSettlementByDateRange = async (params: DateRangeParams) => {
  try {
    const response = await Axios.get('/settlement/date-range', { params });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || '기간별 정산 내역 조회 실패';
  }
};
