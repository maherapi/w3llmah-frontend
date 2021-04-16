import { UserRole } from "../../auth/user.interface";
import { client } from "../../data-source/client";
import { TeacherStatus } from "./dtos";

export interface IUserTeachersResponse {
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
  status: TeacherStatus;
  created_at: string;
  updated_at: string;
}

export interface ITeachersItemResponse {
  id: number;
  certification: string;
  eijazah: string;
  created_at: string;
  updated_at: string;
  user: IUserTeachersResponse;
  rings: {
    id: number;
    name: string;
  }[];
}

export const getAllTeachersManager = async ({ schoolId }: { schoolId: number }) => {
  const response = await client.get<{ teachers: ITeachersItemResponse[] }>(`/schools/${schoolId}/teachers`);
  return response.data.teachers;
};

export const updateTeacherByManager = async ({
  status,
  ringId,
  teacherId,
}: {
  status?: TeacherStatus;
  ringId?: number;
  teacherId: number;
}) => {
  let reqBody: any = {};
  if (status) {
    reqBody.status = status;
  }
  if (ringId) {
    reqBody.ring_id = ringId;
  }
  const response = await client.post<any>(`/managers/${teacherId}/teachers`, reqBody);
  return response.data;
};
