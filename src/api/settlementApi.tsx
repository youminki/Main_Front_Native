// src/api/settlement/settlementApi.tsx
import { Axios } from './Axios';
import { AxiosError } from 'axios';

interface AdminSettlementParams {
  status?: string;
  limit?: number;
  page?: number;
}

export const getAdminSettlementList = async (
  params?: AdminSettlementParams
): Promise<unknown> => {
  try {
    const response = await Axios.get('/settlement', { params });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data ?? '관리자 정산 내역 조회 실패';
  }
};

export const cancelSettlement = async (
  settlementId: number
): Promise<unknown> => {
  try {
    const response = await Axios.post(`/settlement/cancel/${settlementId}`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data ?? '정산 취소 실패';
  }
};

export const completeSettlement = async (
  settlementId: number
): Promise<unknown> => {
  try {
    const response = await Axios.post(`/settlement/complete/${settlementId}`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data ?? '정산 완료 처리 실패';
  }
};

interface DateRangeParams {
  startDate: string;
  endDate: string;
}

export const getSettlementByDateRange = async (
  params: DateRangeParams
): Promise<unknown> => {
  try {
    const response = await Axios.get('/settlement/date-range', { params });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data ?? '기간별 정산 내역 조회 실패';
  }
};

export const getSettlementDetail = async (
  settlementId: number
): Promise<unknown> => {
  try {
    const response = await Axios.get(`/settlement/detail/${settlementId}`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data ?? '정산 상세 조회 실패';
  }
};

export const getUserSettlement = async (email: string): Promise<unknown> => {
  try {
    const response = await Axios.get(`/settlement/${email}`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data ?? '정산 내역 조회 실패';
  }
};

interface SettlementRequestData {
  email: string;
  totalAmount: number;
}

export const requestSettlement = async (
  data: SettlementRequestData
): Promise<unknown> => {
  try {
    const response = await Axios.post('/settlement/request', data);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data ?? '정산 요청 실패';
  }
};
