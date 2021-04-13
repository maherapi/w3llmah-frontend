import { AxiosRequestConfig } from "axios";
import { ISchoolManagerRegisterationSchema } from "../../../common/validation/school-manager-registration";
import { IStudentRegisterationSchema } from "../../../common/validation/student-registration";
import { ITeacherRegisterationSchema } from "../../../common/validation/teacher-registration";
import { client } from "../../data-source/client";
import { toFormData } from "../../data-source/utils/formDataUtils";
import { toSchoolManagerRegisterDto, toStudentRegisterDto, toTeacherRegisterDto } from "./transformation";

export interface IUserRegisterResponseData {
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
}
export interface IStudentRegisterResponseData {
  user: IUserRegisterResponseData;
  student: {
    start_type: "DOWN" | "UP";
    certification: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface ITeacherRegisterResponseData {
  user: IUserRegisterResponseData;
  teacher: {
    certification: string;
    eijazah: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface ISchoolManagerRegisterResponseData {
  user: IUserRegisterResponseData;
  manager: {
    updated_at: string;
    created_at: string;
    id: number;
  };
  school: {
    address: string;
    latitude: string;
    longitude: string;
    gender: string;
    name: string;
    updated_at: string;
    created_at: string;
    id: number;
    manager_id: number;
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
  const response = await client.post<IStudentRegisterResponseData>(`/students`, formData, config);
  return response.data;
};

export const registerTeacher = async (teacher: ITeacherRegisterationSchema) => {
  const teacherRegisterDto = toTeacherRegisterDto(teacher);
  const formData = toFormData(teacherRegisterDto);
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.post<ITeacherRegisterResponseData>(`/teachers`, formData, config);
  return response.data;
};

export const registerSchoolManager = async (schoolManager: ISchoolManagerRegisterationSchema) => {
  const schoolManagerRegisterDto = toSchoolManagerRegisterDto(schoolManager);
  const formData = toFormData(schoolManagerRegisterDto);
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.post<ISchoolManagerRegisterResponseData>(`/managers`, formData, config);
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
