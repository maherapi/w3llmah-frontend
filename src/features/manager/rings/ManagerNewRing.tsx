import { LocalLibrary as RingIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CustomSelect, CustomTextField } from "../../../common/components/forms";
import { SelectOption } from "../../../common/components/forms/CustomSelect";
import buildForm, { CustomFormBuilderContents, CustomFormBuilderField } from "../../../common/factories/formBuilder";
import { setSuccess } from "../../../app/data-source/feedback/clientFeedbackSlice";
import { createNewRing, selectNewRingSubmitted, selectNewRingSubmitting, setNewRingSubmitted } from "../../../app/rings/ringsSlice";
import { INewRingSchema, NewRingSchema } from "../../../common/validation/new-ring";
import { selectLoggedInUser } from "../../../app/auth/authSlice";

const buildRingForm = () => {
  const initialValues: INewRingSchema = {
    name: "",
    max_student: "20",
    period: "",
  };

  const periodOptions: SelectOption[] = [
    { text: "صباحية", value: "MORNING" },
    { text: "مسائية", value: "EVENING" },
  ];

  const newRingFormFields: CustomFormBuilderField[] = [
    {
      name: "name",
      label: "الاسم",
      component: CustomTextField,
    },
    {
      name: "max_student",
      label: "العدد الأقصى للطلاب",
      component: CustomTextField,
    },
    {
      name: "period",
      label: "الفترة",
      component: CustomSelect,
      options: periodOptions,
    },
  ];

  const newRingFormContents: CustomFormBuilderContents<INewRingSchema> = {
    title: "أنشئ حلقة جديدة",
    Icon: RingIcon,
    fields: newRingFormFields,
    initialValues,
    submitBtnText: "أنشئ الحلقة",
    submittingBtnText: "جارٍ إنشاء الحلقة...",
    validationSchema: NewRingSchema,
    linkTitle: "",
    linkHref: "",
  };

  return buildForm(newRingFormContents);
};

interface Props {}

const ManagerNewRing: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectLoggedInUser);
  const submitted = useSelector(selectNewRingSubmitted);
  const submitting = useSelector(selectNewRingSubmitting);

  const NewRingFormTemplate = buildRingForm();

  useEffect(() => {
    if (submitted) {
      dispatch(setSuccess(`تم إنشاء حلقة جديدة`));
      history.push("/manager/rings");
    }
  }, [submitted]);

  useEffect(() => {
    return () => {
      dispatch(setNewRingSubmitted(false));
    };
  }, []);

  const handleSubmit = async (values: INewRingSchema) =>
    dispatch(
      createNewRing({
        max_student: +(values?.max_student + "") || 0,
        period: values.period || "",
        name: values.name || "",
        manager_id: user.userable_id,
        school_id: user.userable.school.id,
      })
    );

  return <NewRingFormTemplate handleSubmit={handleSubmit} submitting={submitting} />;
};

export default ManagerNewRing;
