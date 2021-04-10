import { Person as PersonIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, selectOTPChecked, selectOTPChecking, selectUsername } from "../../app/auth/authSlice";
import {
  selectUser,
} from "../../app/registration/registrationSlice";
import { CustomTextField } from "../../common/components/forms";
import buildForm, { CustomFormBuilderContents, CustomFormBuilderField } from "../../common/factories/formBuilder";
import { IOTPFormSchema, OTPFormSchema } from "../../common/validation/otp-code";

const initialValues: IOTPFormSchema = {
  OTPCode: "",
};

const verificationFormFields: CustomFormBuilderField[] = [
  {
    name: "OTPCode",
    label: "رمز التحقق",
    component: CustomTextField,
  },
];

const verificationFormContents: CustomFormBuilderContents<IOTPFormSchema> = {
  title: "أدخل رمز التحقق المرسل إلى رقم جوالك",
  Icon: PersonIcon,
  fields: verificationFormFields,
  initialValues,
  submitBtnText: "تأكيد الرقم",
  submittingBtnText: "جارٍ التحقق...",
  validationSchema: OTPFormSchema,
};

const VerificationFormTemplate = buildForm(verificationFormContents);

interface Props {}

const Verification: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(selectUsername);
  const checking = useSelector(selectOTPChecking);
  const checked = useSelector(selectOTPChecked);

  useEffect(() => {
    if (checked) {
      history.push("/");
    }
  }, [checked]);

  const handleSubmit = async (values: IOTPFormSchema) => {
    dispatch(login({ ...values, username }));
  };

  return <VerificationFormTemplate handleSubmit={handleSubmit} submitting={checking} />;
};

export default Verification;
