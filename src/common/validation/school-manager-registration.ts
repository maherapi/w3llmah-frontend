import * as Yup from "yup";
import { imageYupValidator } from "./images-constraints";

export interface ISchoolManagerRegisterationSchema {
  schoolName?: string;
  location?: string;
  schoolGender?: string;
  managerName?: string;
  email?: string;
  phone?: string;
  birth?: Date | "";
  profileImage?: File | null;
}

const requiredMessage = "هذا الحقل مطلوب";

export const SchoolManagerRegistrationSchema = Yup.object().shape({
  schoolName: Yup.string().min(5, "يرجى ادخال اسمك الكامل (لا يقل عن 5 حروف)").required(requiredMessage),
  location: Yup.string().required(requiredMessage),
  schoolGender: Yup.string().required(requiredMessage),
  managerName: Yup.string().min(5, "يرجى ادخال اسمك الكامل (لا يقل عن 5 حروف)").required(requiredMessage),
  email: Yup.string().email("يرجى التأكد من صحة بريد إلكتروني").required(requiredMessage),
  phone: Yup.string()
    .matches(/^(9665){1}[0-9]{8}$/, "يرجى التأكد من رقم الجوال (رقم سعودي 9665xxxxxxxx)")
    .required(requiredMessage),
  birth: Yup.date().required(requiredMessage),
  profileImage: imageYupValidator.required(requiredMessage),
});
