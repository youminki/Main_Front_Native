import axios from 'axios';

// 예약 스케줄 생성 요청 타입
export interface RentalScheduleCreateRequest {
  productId: number;
  sizeLabel: string;
  color: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  quantity: number;
}

// 예약 스케줄 응답 타입
export interface RentalScheduleResponse {
  product_id: number;
  product_size_stock_id: number;
  start_date: string;
  end_date: string;
  quantity: number;
  id: number;
  createdAt: string;
}

// 서버가 반환하는 비활성 날짜 항목 타입
interface UnavailableEntry {
  sizeLabel: string;
  color?: string;
  unavailableDates: string[];
}

// 파라미터 타입
export interface UnavailableParams {
  productId: number;
  sizeLabel: string;
  color: string;
}

export const getUnavailableDates = async (
  params: UnavailableParams
): Promise<string[]> => {
  const resp = await axios.get<UnavailableEntry[]>('/rental-schedule', {
    params,
  });
  // resp.data가 배열이 아닐 수 있으니 방어 처리
  const data = resp.data;
  const list: UnavailableEntry[] = Array.isArray(data) ? data : [];
  const entry = list.find(
    (e) =>
      e.sizeLabel === params.sizeLabel &&
      (params.color ? e.color === params.color : true)
  );
  return entry ? entry.unavailableDates : [];
};

/** POST /rental-schedule */
export const createRentalSchedule = async (
  data: RentalScheduleCreateRequest
): Promise<RentalScheduleResponse> => {
  const response = await axios.post<RentalScheduleResponse>(
    '/rental-schedule',
    data
  );
  return response.data;
};
