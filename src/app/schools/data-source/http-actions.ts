import { AxiosRequestConfig } from "axios";
import { UserRole } from "../../auth/user.interface";
import { client } from "../../data-source/client";
import { toFormData } from "../../data-source/utils/formDataUtils";
import { SchoolStatus } from "./dtos";

export interface IUserSchoolsResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  date_of_birth: string;
  profile_img: string;
  verified_at: string;
  userable_id: number;
  userable_type: UserRole;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IManagerSchoolsResponse {
  id: number;
  created_at: string;
  updated_at: string;
  user: IUserSchoolsResponse;
}

export interface ISchoolsItemResponse {
  id: number;
  name: string;
  manager_id: number;
  address: string;
  latitude: number;
  longitude: number;
  gender: string;
  status: SchoolStatus;
  created_at: string;
  updated_at: string;
  manager: IManagerSchoolsResponse;
}

export const getAllSchoolsAdmin = async () => {
  const response = await client.get<{ schools: ISchoolsItemResponse[] }>(`/schools`);
  return response.data.schools;
};

export const updateActivationSchool = async ({ status, managerId }: { status: SchoolStatus; managerId: number }) => {
  const formData = toFormData({ status });
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.post<any>(`/managers/${managerId}`, formData, config);
  return response.data;
};
