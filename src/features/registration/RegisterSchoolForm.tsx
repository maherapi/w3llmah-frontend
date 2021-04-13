import { Person as PersonIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectOTPSent, sendOTP } from "../../app/auth/authSlice";
import { setSuccess } from "../../app/data-source/feedback/clientFeedbackSlice";
import citiesLocations from "../../app/data-source/static-data/saudi-cities.json";
import {
  registerSchoolManager,
  selectSubmitted,
  selectSubmitting,
  selectUser,
} from "../../app/registration/registrationSlice";
import { CustomDatePicker, CustomSelect, CustomTextField } from "../../common/components/forms";
import CustomFileUpload from "../../common/components/forms/CustomFileUpload";
import { SelectOption } from "../../common/components/forms/CustomSelect";
import buildForm, { CustomFormBuilderContents, CustomFormBuilderField } from "../../common/factories/formBuilder";
import { IMAGES_CONSTRAINTS } from "../../common/validation/images-constraints";
import {
  ISchoolManagerRegisterationSchema,
  SchoolManagerRegistrationSchema,
} from "../../common/validation/school-manager-registration";

const buildRegistrationForm = () => {
  const initialValues: ISchoolManagerRegisterationSchema = {
    schoolName: "",
    managerName: "",
    email: "",
    phone: "",
    birth: "",
    profileImage: null,
    location: "",
    schoolGender: "",
  };

  const locationOptions: SelectOption[] = citiesLocations.map((s) => ({
    text: s.address,
    value: `${s.address}&${s.longitude}&${s.latitude}`,
  }));

  const schoolGenderOptions: SelectOption[] = [
    { text: "للذكور", value: "MALE" },
    { text: "للإناث", value: "FEMALE" },
  ];

  const schoolManagerFormFields: CustomFormBuilderField[] = [
    {
      name: "schoolName",
      label: "اسم المدرسة",
      component: CustomTextField,
    },
    {
      name: "location",
      label: "موقع المدرسة",
      component: CustomSelect,
      options: locationOptions,
    },
    {
      name: "schoolGender",
      label: "نوع المدرسة",
      component: CustomSelect,
      options: schoolGenderOptions,
    },
    {
      name: "managerName",
      label: "اسم مدير المدرسة",
      component: CustomTextField,
    },
    {
      name: "email",
      label: "البريد الالكتروني",
      component: CustomTextField,
    },
    {
      name: "phone",
      label: "رقم الجوال",
      component: CustomTextField,
    },
    {
      name: "birth",
      label: "تاريخ الميلاد",
      component: CustomDatePicker,
    },
    {
      name: "profileImage",
      label: "أضف صورتك شخصية",
      component: CustomFileUpload,
      accept: IMAGES_CONSTRAINTS.TYPES.join(","),
    },
  ];

  const schoolManagerRegistrationFormContents: CustomFormBuilderContents<ISchoolManagerRegisterationSchema> = {
    title: "أنشئ حساب جديد كمدير مدرسة",
    Icon: PersonIcon,
    fields: schoolManagerFormFields,
    initialValues,
    submitBtnText: "أنشئ الحساب",
    submittingBtnText: "جارٍ إنشاء الحساب...",
    validationSchema: SchoolManagerRegistrationSchema,
    linkTitle: "لديك حساب؟ سجل دخول الآن",
    linkHref: "/#/login",
  };

  return buildForm(schoolManagerRegistrationFormContents);
};

interface Props {}

const RegisterSchoolForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitted = useSelector(selectSubmitted);
  const submitting = useSelector(selectSubmitting);
  const user = useSelector(selectUser);
  const OTPSent = useSelector(selectOTPSent);

  const RegisterSchoolManagerFormTemplate = buildRegistrationForm();

  useEffect(() => {
    if (submitted) {
      dispatch(setSuccess(`اسم المستخدم الخاص بك: ${user.username}`));
      dispatch(sendOTP({ username: user.username }));
    }
  }, [submitted]);

  useEffect(() => {
    if (OTPSent) {
      dispatch(setSuccess("تم إرسال رمز التحقق إلى جوالك"));
      history.push("/verify");
    }
  }, [OTPSent]);

  const handleSubmit = async (values: ISchoolManagerRegisterationSchema) => dispatch(registerSchoolManager(values));

  return <RegisterSchoolManagerFormTemplate handleSubmit={handleSubmit} submitting={submitting} />;
};

export default RegisterSchoolForm;
