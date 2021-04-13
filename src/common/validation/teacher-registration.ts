import * as Yup from "yup";
import { imageYupValidator } from "./images-constraints";

export interface ITeacherRegisterationSchema {
  name?: string;
  email?: string;
  phone?: string;
  birth?: Date | "";
  certification?: File | null;
  profileImage?: File | null;
  ejazah?: File | null;
  schoolId?: number | "";
}

const requiredMessage = "هذا الحقل مطلوب";

export const TeacherRegistrationSchema = Yup.object().shape({
  name: Yup.string().min(5, "يرجى ادخال اسمك الكامل (لا يقل عن 5 حروف)").required(requiredMessage),
  email: Yup.string().email("يرجى التأكد من صحة بريد إلكتروني").required(requiredMessage),
  phone: Yup.string()
    .matches(/^(9665){1}[0-9]{8}$/, "يرجى التأكد من رقم الجوال (رقم سعودي 9665xxxxxxxx)")
    .required(requiredMessage),
  birth: Yup.date().required(requiredMessage),
  certification: imageYupValidator.required(requiredMessage),
  profileImage: imageYupValidator.required(requiredMessage),
  ejazah: imageYupValidator.required(requiredMessage),
  schoolId: Yup.number().required(requiredMessage),
});
