import * as Yup from "yup";

export interface IOTPFormSchema {
  OTPCode?: string;
  username?: string;
}

const requiredMessage = "هذا الحقل مطلوب";

export const OTPFormSchema = Yup.object().shape({
  OTPCode: Yup.string()
    .matches(/^[0-9]{4}$/, "رمز التحقق مكون من أربع أرقام")
    .required(requiredMessage),
});
