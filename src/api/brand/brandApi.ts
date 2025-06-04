// src/api/brand.ts

import { Axios } from '../Axios';

/**
 * 브랜드 정보 타입
 */
export interface Brand {
  id: number;
  brandName: string;
  groupName: string;
}

/**
 * 사용자용 브랜드 셀렉트 리스트 조회
 * GET /brand/list
 */
export const getBrandList = async (): Promise<Brand[]> => {
  const response = await Axios.get<Brand[]>('/brand/list');
  return response.data;
};

export default {
  getBrandList,
};
