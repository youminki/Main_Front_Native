// src/api/address.ts

import { Axios } from '../Axios';

export interface Address {
  id: number;
  address: string;
  addressDetail: string;
  isDefault: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/**
 * 새 주소 등록 요청 타입
 */
export interface CreateAddressRequest {
  address: string;
  addressDetail: string;
}

/**
 * 주소 수정 요청 타입
 * address 혹은 addressDetail 중 하나 또는 둘 다 보낼 수 있습니다.
 */
export interface UpdateAddressRequest {
  address?: string;
  addressDetail?: string;
}

export const AddressApi = {
  /**
   * 내 주소 목록 조회
   * GET /user-address
   */
  async getAddresses(): Promise<Address[]> {
    const response = await Axios.get<Address[]>('/user-address');
    return response.data;
  },

  /**
   * 새 주소 추가
   * POST /user-address
   */
  async createAddress(data: CreateAddressRequest): Promise<Address> {
    const response = await Axios.post<Address>('/user-address', data);
    return response.data;
  },

  /**
   * 주소 수정
   * PATCH /user-address/{id}
   */
  async updateAddress(
    id: number,
    data: UpdateAddressRequest
  ): Promise<Address> {
    const response = await Axios.patch<Address>(`/user-address/${id}`, data);
    return response.data;
  },

  /**
   * 주소 삭제
   * DELETE /user-address/{id}
   */
  async deleteAddress(id: number): Promise<void> {
    await Axios.delete(`/user-address/${id}`);
  },
};
