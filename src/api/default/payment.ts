import { Axios } from '../Axios';

/**
 * 테스트용 Payple 엔드포인트 호출
 */
export const getPaypleTest = () => {
  return Axios.get<void>('/test/payple');
};

/**
 * 결제 요청
 */
export const postPaymentPay = () => {
  return Axios.post<void>('/payment/pay');
};

/**
 * 카드 등록용 데이터 조회
 */
export const getCardRegisterData = () => {
  return Axios.get<CardRegisterData>('/payple/card-register-data');
};

/**
 * 카드 등록 결과 수신 및 프론트 리다이렉트
 */
export const postPaypleResult = () => {
  return Axios.post<void>('/payple/result');
};

/**
 * 등록된 카드로 결제
 */
export const postPayWithRegisteredCard = () => {
  return Axios.post<void>('/payple/pay-with-registered-card');
};

/**
 * 결제용 Payple 요청 데이터 조회
 */
export const postInitPayment = () => {
  return Axios.post<InitPaymentData>('/payple/init-payment');
};

/**
 * Payple 결제 승인 요청
 */
export const postConfirmPayment = () => {
  return Axios.post<void>('/payple/confirm-payment');
};

/**
 * 로그인 유저의 카드 목록 조회
 */
export const getMyCards = () => {
  return Axios.get<CardListResponse>('/card/me');
};

// --- Types ---

/**
 * 카드 등록용 데이터 스펙 (구체 타입 정의 필요)
 */
export interface CardRegisterData {
  [key: string]: any;
}

/**
 * 결제 초기화 응답 데이터 스펙 (구체 타입 정의 필요)
 */
export interface InitPaymentData {
  [key: string]: any;
}

/**
 * 단일 카드 항목
 */
export interface CardItem {
  cardId: number;
  payerId: string;
  cardName: string;
  cardNumber: string;
  createdAt: string; // ISO 8601
}

/**
 * 카드 목록 조회 응답
 */
export interface CardListResponse {
  count: number;
  items: CardItem[];
}
