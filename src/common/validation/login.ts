import * as Yup from "yup";

export interface ILoginFormSchema {
  username?: string;
}

const requiredMessage = "هذا الحقل مطلوب";

export const LoginFormSchema = Yup.object().shape({
  username: Yup.string().required(requiredMessage),
});
