import { Person as PersonIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectOTPSending, sendOTP } from "../../app/auth/authSlice";
import { selectOTPSent } from "../../app/auth/authSlice";
import { CustomTextField } from "../../common/components/forms";
import buildForm, { CustomFormBuilderContents, CustomFormBuilderField } from "../../common/factories/formBuilder";
import { setSuccess } from "../../app/data-source/feedback/clientFeedbackSlice";
import { ILoginFormSchema, LoginFormSchema } from "../../common/validation/login";

const initialValues: ILoginFormSchema = {
  username: "",
};

const registerFormFields: CustomFormBuilderField[] = [
  {
    name: "username",
    label: "اسم المستخدم",
    component: CustomTextField,
  },
];

const loginFormContents: CustomFormBuilderContents<ILoginFormSchema> = {
  title: "سجل دخول إلى النظام",
  Icon: PersonIcon,
  fields: registerFormFields,
  initialValues,
  submitBtnText: "أرسل",
  submittingBtnText: "جارٍ الإرسال...",
  validationSchema: LoginFormSchema,
  linkTitle: "ليس لديك حساب؟ سجل الآن",
  linkHref: "/register",
};

const LoginFormTemplate = buildForm(loginFormContents);

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const OTPSending = useSelector(selectOTPSending);
  const OTPSent = useSelector(selectOTPSent);

  useEffect(() => {
    if (OTPSent) {
      dispatch(setSuccess("تم إرسال رمز التحقق إلى جوالك"));
      history.push("/verify");
    }
  }, [OTPSent]);

  const handleSubmit = async (values: ILoginFormSchema) => dispatch(sendOTP({ username: values.username || "" }));

  return <LoginFormTemplate handleSubmit={handleSubmit} submitting={OTPSending} />;
};

export default LoginForm;
