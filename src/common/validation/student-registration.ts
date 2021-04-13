import * as Yup from "yup";
import { imageYupValidator } from "./images-constraints";

export interface IStudentRegisterationSchema {
  name?: string;
  email?: string;
  phone?: string;
  birth?: Date | "";
  avatar?: File | null;
  startType?: "DOWN" | "UP" | "";
  certification?: File | null;
  schoolId?: number | "";
  lastLessonId?: string | undefined;
}

const requiredMessage = "هذا الحقل مطلوب";

export const StudentRegistrationSchema = Yup.object().shape({
  name: Yup.string().min(5, "يرجى ادخال اسمك الكامل (لا يقل عن 5 حروف)").required(requiredMessage),
  email: Yup.string().email("يرجى التأكد من صحة بريد إلكتروني").required(requiredMessage),
  phone: Yup.string()
    .matches(/^(9665){1}[0-9]{8}$/, "يرجى التأكد من رقم الجوال (رقم سعودي 9665xxxxxxxx)")
    .required(requiredMessage),
  birth: Yup.date().required(requiredMessage),
  certification: imageYupValidator.required(requiredMessage),
  startType: Yup.string().equals(["DOWN", "UP"]).required(requiredMessage),
  schoolId: Yup.number().required(requiredMessage),
  lastLessonId: Yup.string().required(requiredMessage),
});
