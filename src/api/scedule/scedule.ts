// src/api/schedule.ts
import axios from 'axios';

export interface ScheduleCreateRequest {
  month: string; // "YYYY-MM" 형식
  productIds: number[];
}

export interface ScheduleResponse {
  id: number;
  influencer: string;
  month: string;
  products: string[];
}

/** 스케줄 생성 */
export const createSchedule = async (
  data: ScheduleCreateRequest
): Promise<ScheduleResponse> => {
  const response = await axios.post<ScheduleResponse>('/schedule', data);
  return response.data;
};

/** 본인 스케줄 전체 조회 */
export const getMySchedules = async (): Promise<ScheduleResponse[]> => {
  const response = await axios.get<ScheduleResponse[]>('/schedule');
  return response.data;
};

/** 특정 스케줄 상세 조회 */
export const getScheduleById = async (
  scheduleId: number
): Promise<ScheduleResponse> => {
  const response = await axios.get<ScheduleResponse>(`/schedule/${scheduleId}`);
  return response.data;
};

/** 스케줄 삭제 */
export const deleteSchedule = async (
  scheduleId: number
): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(
    `/schedule/${scheduleId}`
  );
  return response.data;
};
