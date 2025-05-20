import { Axios } from '../Axios';

/**
 * 이용권 템플릿 정보 (UserTicket.ticketList)
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
 * 로그인한 사용자의 이용권 정보 스펙
 */
export interface TicketItem {
  id: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  remainingRentals: number; // 잔여 대여 횟수
  monthlyUsedRentals: number; // 이번 달 사용한 횟수
  autoRenewal: boolean; // 자동 갱신 여부
  nextBillingDate?: string; // 다음 결제 일시 (ISO 8601, 자동 갱신 시에만)
  isActive: boolean; // 활성 상태
  status: 'PAID' | 'PENDING' | 'CANCELLED' | 'EXPIRED' | string;
  ticketList: TicketList; // 템플릿 정보
  purchasedAt: string; // 구매 일시 (ISO 8601)
}

/**
 * 로그인한 사용자의 이용권 목록 조회
 * GET /user/me/tickets
 */
export const getUserTickets = async (): Promise<TicketItem[]> => {
  const response = await Axios.get<TicketItem[]>('/user/me/tickets');
  return response.data;
};

/**
 * 이용권 템플릿 전체 조회
 * GET /ticket/templates
 */
export interface TicketTemplatesResponse {
  items: TicketList[];
}
