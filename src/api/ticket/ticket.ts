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
  isUlimited: boolean; // 무제한 여부
  price: number; // 가격 (원)
  recurringIntervalMonths: number; // 갱신 주기 (개월)
  isVisible: boolean; // 화면 노출 여부
  createdAt: string; // 생성일시 (ISO 8601)
}

/**
 * /ticket-list 응답 전체 객체
 */
export interface TicketListResponse {
  total: number; // 전체 이용권 개수
  items: TicketList[]; // 이용권 목록
}

/**
 * 로그인한 사용자의 이용권 정보
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

/**
 * 전체 이용권 목록 조회 (공개)
 * GET /ticket-list
 */
export const getAllTicketTemplates = async (): Promise<TicketListResponse> => {
  const response = await Axios.get<TicketListResponse>('/ticket-list');
  return response.data;
};

/**
 * 1. 로그인한 사용자의 이용권 목록 조회
 * GET /ticket/user
 * @returns TicketItem[]
 */
export const getUserTickets = () => {
  return Axios.get<TicketItem[]>('/user/me/tickets');
};

// --- Types ---
/**
 * 사용자가 구매한 이용권 항목 스펙
 */
export interface TicketItem {
  id: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  remainingRentals: number;
  monthlyUsedRentals: number;
  autoRenewal: boolean;
  nextBillingDate: string; // ISO 8601
  isActive: boolean;
  status: 'PAID' | 'EXPIRED' | string;
  ticketList: {
    id: number;
    name: string;
    durationMonths: number;
    rentalLimit: number;
    monthlyRentalLimit: number;
    isLongTerm: boolean;
    price: number;
  };
  purchasedAt: string; // ISO 8601
}
