import { Person as PersonIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendOTP } from "../../app/auth/authSlice";
import {
  clearRegistrationState,
  getAllSchools,
  getAllSourahs,
  registerStudent,
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
import { IStudentRegisterationSchema, StudentRegistrationSchema } from "../../common/validation/student-registration";
import env from "../../env";
import { setSuccess } from "../../app/data-source/feedback/clientFeedbackSlice";
import { store } from "../../app/store";

const buildRegistrationForm = () => {
  const initialValues: IStudentRegisterationSchema = {
    name: "",
    email: "",
    phone: "",
    birth: "",
    startType: "",
    certification: null,
    schoolId: "",
  };

  const startTypeOptions: SelectOption[] = [
    { text: "من الجزء الأول", value: "UP" },
    { text: "من الجزء الثلاثين", value: "DOWN" },
  ];

  const schoolsOptions: SelectOption[] = store
    .getState()
    .registration.schools.map((s) => ({ text: s.name, value: `${s.id}` }));

  const sourahsOptions: SelectOption[] = store
    .getState()
    .registration.sourahs.map((s) => ({ text: s.sourah_name, value: `${s.id}` }));

  const studentFormFields: CustomFormBuilderField[] = [
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
      name: "startType",
      label: "طريقة الحفظ",
      component: CustomSelect,
      options: startTypeOptions,
    },
    {
      name: "lastLessonId",
      label: "مكان الوصول في الحفظ",
      component: CustomSelect,
      options: sourahsOptions,
    },
    {
      name: "schoolId",
      label: "المدرسة",
      component: CustomSelect,
      options: schoolsOptions,
    },
    {
      name: "certification",
      label: "أضف شهادة الحفظ",
      component: CustomFileUpload,
      accept: IMAGES_CONSTRAINTS.TYPES.join(","),
    },
  ];

  const studentRegistrationFormContents: CustomFormBuilderContents<IStudentRegisterationSchema> = {
    title: "أنشئ حساب جديد كطالب",
    Icon: PersonIcon,
    fields: studentFormFields,
    initialValues,
    submitBtnText: "أنشئ الحساب",
    submittingBtnText: "جارٍ إنشاء الحساب...",
    validationSchema: StudentRegistrationSchema,
    linkTitle: "لديك حساب؟ حمل التطبيق الآن",
    linkHref: env.androidAppLink,
  };

  return buildForm(studentRegistrationFormContents);
};

interface Props {}

const RegisterStudentForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitted = useSelector(selectSubmitted);
  const submitting = useSelector(selectSubmitting);
  const user = useSelector(selectUser);
  const OTPSent = useSelector(selectOTPSent);
  const schools = useSelector(selectAllSchools);
  const sourahs = useSelector(selectAllSourahs);

  useEffect(() => {
    if(!schools.length) {
      dispatch(getAllSchools());
    }
    if(!sourahs.length) {
      dispatch(getAllSourahs());
    }
  }, []);

  const RegisterStudentFormTemplate = buildRegistrationForm();

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

  const handleSubmit = async (values: IStudentRegisterationSchema) => dispatch(registerStudent(values));

  return <RegisterStudentFormTemplate handleSubmit={handleSubmit} submitting={submitting} />;
};

export default RegisterStudentForm;
