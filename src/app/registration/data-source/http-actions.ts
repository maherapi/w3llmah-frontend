import { AxiosRequestConfig } from "axios";
import { IStudentRegisterationSchema } from "../../../common/validation/student-regitration";
import { client } from "../../data-source/client";
import { toFormData } from "../../data-source/utils/formDataUtils";
import { toStudentRegisterDto } from "./transformation";

export interface IRegisterResponseData {
  user: {
    name: string;
    date_of_birth: string;
    email: string;
    phone: string;
    username: string;
    profile_img: string;
    userable_id: number;
    userable_type: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  student: {
    start_type: "DOWN" | "UP";
    certification: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface IAllSchoolsResponse {
  id: number;
  name: string;
  manager_id: number;
  address: string;
  latitude: number;
  longitude: number;
  gender: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IAllSourahsResponse {
  id: number;
  sourah_name: string;
}

export const registerStudent = async (student: IStudentRegisterationSchema) => {
  const studentRegisterDto = toStudentRegisterDto(student);
  const formData = toFormData(studentRegisterDto);
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.post<IRegisterResponseData>(`/students`, formData, config);
  return response.data;
};

export const getAllSchools = async () => {
  const response = await client.get<{ schools: IAllSchoolsResponse[] }>(`/schools`);
  return response.data.schools;
};

export const getAllSourahs = async () => {
  const response = await client.get<{ sourahs: IAllSourahsResponse[] }>(`/ayats/sourahs`);
  return response.data.sourahs;
};
