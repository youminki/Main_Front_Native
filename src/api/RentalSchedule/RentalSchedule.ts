// src/api/rentalScheduleApi.ts
import { Axios } from '../Axios';

export interface RentalScheduleItem {
  brand: string;
  productNum: string;
  category: string;
  serviceType: '대여' | '구매';
  size: string;
  color: string;
  mainImage: string;
  ticketName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export interface RentalScheduleResponse {
  count: number;
  rentals: RentalScheduleItem[];
}

/**
 * 로그인한 유저의 대여/구매 내역을 조회합니다.
 * GET /rental-schedule/my
 */
export const getMyRentalSchedule =
  async (): Promise<RentalScheduleResponse> => {
    const response = await Axios.get<RentalScheduleResponse>(
      '/rental-schedule/my'
    );
    return response.data;
  };
