import axios from 'axios';

/**
 * 이용권 템플릿 정보
 */
export interface TicketList {
  id: number;
  name: string;
  durationMonths: number;
  rentalLimit: number;
  monthlyRentalLimit: number;
  isLongTerm: boolean;
  price: number;
}

/**
 * 사용자 이용권 정보
 */
export interface UserTicket {
  id: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  remainingRentals: number; // 남은 대여 횟수
  monthlyUsedRentals: number; // 이달 대여 사용 횟수
  autoRenewal: boolean; // 자동 갱신 여부
  nextBillingDate?: string; // 다음 결제일 (ISO 8601)
  isActive: boolean; // 활성화 여부
  status: 'PAID' | 'PENDING' | 'CANCELLED' | string;
  ticketList: TicketList; // 템플릿 정보
  purchasedAt: string; // 구매 시각 (ISO 8601)
}

/**
 * 로그인한 사용자의 모든 이용권 조회
 */
export const getUserTickets = async (): Promise<UserTicket[]> => {
  const response = await axios.get<UserTicket[]>('/ticket/user');
  return response.data;
};

/**
 * 특정 기간(startDate~endDate) 동안 구매된 이용권 조회
 *
 * @param startDate YYYY-MM-DD 형식의 시작일
 * @param endDate   YYYY-MM-DD 형식의 종료일
 */
export const getUserTicketsByDateRange = async (
  startDate: string,
  endDate: string
): Promise<UserTicket[]> => {
  const response = await axios.get<UserTicket[]>('/ticket/user/date-range', {
    params: { startDate, endDate },
  });
  return response.data;
};
