import { Axios } from '../Axios';

export interface ClosetItem {
  productId: number;
  mainImage: string;
  name: string;
  brand: string;
  category: string;
}

export interface ClosetListResponse {
  count: number;
  items: ClosetItem[];
}

export const addToCloset = async (productId: number): Promise<void> => {
  const resp = await Axios.post(`/closet/${productId}`);
  if (resp.status !== 201) {
    throw new Error('찜 추가 실패');
  }
};

export const removeFromCloset = async (productId: number): Promise<void> => {
  const resp = await Axios.delete(`/closet/${productId}`);
  if (resp.status !== 200) {
    throw new Error('찜 삭제 실패');
  }
};

export const getMyCloset = async (): Promise<ClosetListResponse> => {
  const resp = await Axios.get<ClosetListResponse>('/closet/me');
  return resp.data;
};
