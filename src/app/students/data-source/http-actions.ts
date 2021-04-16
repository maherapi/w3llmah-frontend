import { UserRole } from "../../auth/user.interface";
import { client } from "../../data-source/client";
import { StudentStatus } from "./dtos";

export interface IUserStudentsResponse {
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
  status: StudentStatus;
  created_at: string;
  updated_at: string;
}

export interface IStudentsItemResponse {
  id: number;
  sum_score: number;
  certification: string;
  ring_id: number;
  start_type: string;
  default_lesson: string;
  enable_default_lesson: string;
  default_review: string;
  enable_default_review: string;
  created_at: string;
  updated_at: string;
  last_lesson_id: number;
  user: IUserStudentsResponse;
  ring: {
    id: number;
    name: string;
  };
}

export const getAllStudentsManager = async ({ schoolId }: { schoolId: number }) => {
  const response = await client.get<{ students: IStudentsItemResponse[] }>(`/schools/${schoolId}/students`);
  return response.data.students;
};

export const updateStudentByManager = async ({
  status,
  ringId,
  studentId,
}: {
  status?: StudentStatus;
  ringId?: number;
  studentId: number;
}) => {
  let reqBody: any = {};
  if (status) {
    reqBody.status = status;
  }
  if (ringId) {
    reqBody.ring_id = ringId;
  }
  const response = await client.post<any>(`/managers/${studentId}/students`, reqBody);
  return response.data;
};
