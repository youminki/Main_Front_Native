import { Axios } from '../Axios';

/**
 * 이용권 템플릿 정보
 */
export interface TicketList {
  id: number;
  name: string; // 이용권 이름
  durationMonths: number; // 사용 가능 개월 수
  rentalLimit: number; // 전체 대여 제한 횟수
  monthlyRentalLimit: number; // 월별 대여 제한 횟수
  isLongTerm: boolean; // 장기권 여부
  price: number; // 가격 (원)
}

/**
 * 모든 이용권 템플릿 조회
 */
export const getTicketTemplates = async (): Promise<TicketList[]> => {
  const res = await Axios.get<TicketList[]>('/ticket/templates');
  return res.data;
};

/**
 * 로그인한 사용자의 이용권 조회
 */
export interface UserTicket {
  id: number;
  startDate: string;
  endDate: string;
  remainingRentals: number;
  monthlyUsedRentals: number;
  autoRenewal: boolean;
  nextBillingDate?: string;
  isActive: boolean;
  status: 'PAID' | 'PENDING' | 'CANCELLED' | string;
  ticketList: TicketList;
  purchasedAt: string;
}

export const getUserTickets = async (): Promise<UserTicket[]> => {
  const response = await Axios.get<UserTicket[]>('/ticket/user');
  return response.data;
};

export const getUserTicketsByDateRange = async (
  startDate: string,
  endDate: string
): Promise<UserTicket[]> => {
  const response = await Axios.get<UserTicket[]>('/ticket/user/date-range', {
    params: { startDate, endDate },
  });
  return response.data;
};
