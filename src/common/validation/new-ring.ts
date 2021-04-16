import * as Yup from "yup";

export interface INewRingSchema {
  name?: string;
  max_student?: string;
  period?: string;
}

const requiredMessage = "هذا الحقل مطلوب";

export const NewRingSchema = Yup.object().shape({
  name: Yup.string().min(5, "يرجى ادخال اسم صحيح (لا يقل عن 5 حروف)").required(requiredMessage),
  max_student: Yup.string()
    .matches(/^[0-9]*$/, "يرجى ادخال رقم صحيح")
    .required(requiredMessage),
  period: Yup.string().equals(["MORNING", "EVENING"]).required(requiredMessage),
});
