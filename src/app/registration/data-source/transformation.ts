import { IStudentRegisterationSchema } from "../../../common/validation/student-regitration";
import { StudentRegisterDto } from "./dtos";

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
