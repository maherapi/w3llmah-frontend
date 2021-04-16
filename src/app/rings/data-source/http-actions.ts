import { AxiosRequestConfig } from "axios";
import { client } from "../../data-source/client";
import { toFormData } from "../../data-source/utils/formDataUtils";
import { NewRingDto, RingStatus } from "./dtos";

export interface IRingsItemResponse {
  id: number;
  school_id: number;
  name: string;
  period: string;
  best_student: null;
  auto_selection: string;
  show_perfect_student: string;
  encouragement: string;
  max_student: number;
  status: RingStatus;
  created_at: string;
  updated_at: string;
  teacherName: string;
  teacher?: any;
}

export const getAllRings = async (userId: number) => {
  const response = await client.get<{ rings: IRingsItemResponse[] }>(`/rings/${userId}`);
  return response.data.rings;
};

export const createNewRing = async (newRing: NewRingDto) => {
  const response = await client.post<any>(`/rings`, newRing);
  return response.data;
};

export const updateRingByManager = async ({ status, ringId }: { status: RingStatus; ringId: number }) => {
  const response = await client.post<any>(`/rings/${ringId}`, { status });
  return response.data;
};
