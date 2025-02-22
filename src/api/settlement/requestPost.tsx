import { Axios } from '../Axios';

interface SettlementRequestData {
  email: string;
  totalAmount: number;
}

export const requestSettlement = async (data: SettlementRequestData) => {
  try {
    const response = await Axios.post('/settlement/request', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || '정산 요청 실패';
  }
};
