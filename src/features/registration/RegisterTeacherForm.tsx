import { Person as PersonIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendOTP } from "../../app/auth/authSlice";
import {
  clearRegistrationState,
  getAllSchools,
  getAllSourahs,
  registerTeacher,
  selectAllSchools,
  selectAllSourahs,
  selectSubmitted,
  selectSubmitting,
  selectUser,
} from "../../app/registration/registrationSlice";
import { selectOTPSent } from "../../app/auth/authSlice";
import { CustomDatePicker, CustomSelect, CustomTextField } from "../../common/components/forms";
import CustomFileUpload from "../../common/components/forms/CustomFileUpload";
import { SelectOption } from "../../common/components/forms/CustomSelect";
import buildForm, { CustomFormBuilderContents, CustomFormBuilderField } from "../../common/factories/formBuilder";
import { IMAGES_CONSTRAINTS } from "../../common/validation/images-constraints";
import env from "../../env";
import { setSuccess } from "../../app/data-source/feedback/clientFeedbackSlice";
import { store } from "../../app/store";
import { ITeacherRegisterationSchema, TeacherRegistrationSchema } from "../../common/validation/teacher-registration";

const buildRegistrationForm = () => {
  const initialValues: ITeacherRegisterationSchema = {
    name: "",
    email: "",
    phone: "",
    birth: "",
    certification: null,
    profileImage: null,
    ejazah: null,
    schoolId: "",
  };

  const schoolsOptions: SelectOption[] = store
    .getState()
    .registration.schools.map((s) => ({ text: s.name, value: `${s.id}` }));

  const teacherFormFields: CustomFormBuilderField[] = [
    {
      name: "name",
      label: "الاسم كاملًا",
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
      name: "schoolId",
      label: "المدرسة",
      component: CustomSelect,
      options: schoolsOptions,
    },
    {
      name: "profileImage",
      label: "أضف صورتك شخصية",
      component: CustomFileUpload,
      accept: IMAGES_CONSTRAINTS.TYPES.join(","),
    },
    {
      name: "certification",
      label: "أضف شهادة الجمعية",
      component: CustomFileUpload,
      accept: IMAGES_CONSTRAINTS.TYPES.join(","),
    },
    {
      name: "ejazah",
      label: "أضف صورة الإجازة",
      component: CustomFileUpload,
      accept: IMAGES_CONSTRAINTS.TYPES.join(","),
    },
  ];

  const teacherRegistrationFormContents: CustomFormBuilderContents<ITeacherRegisterationSchema> = {
    title: "أنشئ حساب جديد كأستاذ",
    Icon: PersonIcon,
    fields: teacherFormFields,
    initialValues,
    submitBtnText: "أنشئ الحساب",
    submittingBtnText: "جارٍ إنشاء الحساب...",
    validationSchema: TeacherRegistrationSchema,
    linkTitle: "لديك حساب؟ حمل التطبيق الآن",
    linkHref: env.androidAppLink,
  };

  return buildForm(teacherRegistrationFormContents);
};

interface Props {}

const RegisterTeacherForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitted = useSelector(selectSubmitted);
  const submitting = useSelector(selectSubmitting);
  const user = useSelector(selectUser);
  const OTPSent = useSelector(selectOTPSent);
  const schools = useSelector(selectAllSchools);
  const sourahs = useSelector(selectAllSourahs);

  useEffect(() => {
    if (!schools.length) {
      dispatch(getAllSchools());
    }
    if (!sourahs.length) {
      dispatch(getAllSourahs());
    }
  }, []);

  const RegisterTeacherFormTemplate = buildRegistrationForm();

  useEffect(() => {
    if (submitted) {
      dispatch(setSuccess(`اسم المستخدم الخاص بك: ${user.username}`));
      const username = user.username;
      dispatch(clearRegistrationState());
      dispatch(sendOTP({ username: username }));
    }
  }, [submitted]);

  useEffect(() => {
    if (OTPSent) {
      dispatch(setSuccess("تم إرسال رمز التحقق إلى جوالك"));
      history.push("/verify");
    }
  }, [OTPSent]);

  const handleSubmit = async (values: ITeacherRegisterationSchema) => dispatch(registerTeacher(values));

  return <RegisterTeacherFormTemplate handleSubmit={handleSubmit} submitting={submitting} />;
};

export default RegisterTeacherForm;
