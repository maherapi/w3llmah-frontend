import { IStudentRegisterationSchema } from "../../../common/validation/student-registration";
import { ITeacherRegisterationSchema } from "../../../common/validation/teacher-registration";
import { StudentRegisterDto, TeacherRegisterDto } from "./dtos";

export const toStudentRegisterDto = (student: IStudentRegisterationSchema): StudentRegisterDto => ({
  name: student.name,
  date_of_birth: student.birth?.toString(),
  email: student.email,
  phone: student.phone,
  school_id: student.schoolId,
  start_type: student.startType,
  profile_img_tmp: student.avatar,
  certification_tmp: student.certification,
  last_lesson_id: student.lastLessonId,
});

export const toTeacherRegisterDto = (teacher: ITeacherRegisterationSchema): TeacherRegisterDto => ({
  name: teacher.name,
  date_of_birth: teacher.birth?.toString(),
  email: teacher.email,
  phone: teacher.phone,
  school_id: teacher.schoolId,
  profile_img_tmp: teacher.profileImage,
  certification_tmp: teacher.certification,
  eijazah_tmp: teacher.ejazah,
});
