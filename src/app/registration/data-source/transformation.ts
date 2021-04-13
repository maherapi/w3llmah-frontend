import { ISchoolManagerRegisterationSchema } from "../../../common/validation/school-manager-registration";
import { IStudentRegisterationSchema } from "../../../common/validation/student-registration";
import { ITeacherRegisterationSchema } from "../../../common/validation/teacher-registration";
import { SchoolManagerRegisterDto, StudentRegisterDto, TeacherRegisterDto } from "./dtos";

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

export const toSchoolManagerRegisterDto = (schoolManager: ISchoolManagerRegisterationSchema): SchoolManagerRegisterDto => ({
  school_name: schoolManager.schoolName,
  longitude: schoolManager.location?.split("&")[1],
  latitude: schoolManager.location?.split("&")[2],
  address: schoolManager.location?.split("&")[0],
  gender: schoolManager.schoolGender,
  manager_name: schoolManager.managerName,
  date_of_birth: schoolManager.birth?.toString(),
  email: schoolManager.email,
  phone: schoolManager.phone,
  profile_img_tmp: schoolManager.profileImage,
});
