import { Button, ButtonProps, FormControlProps, FormHelperText, Input, makeStyles } from "@material-ui/core";
import { FieldProps } from "formik";
import React, { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
  error: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
}));

interface CustomProps {
  label: string;
  accept: string;
}
type Props = FieldProps & ButtonProps & CustomProps & FormControlProps;

const CustomFileUpload: React.FC<Props> = ({ variant = "outlined", label, field, form, accept = "" }) => {
  const classes = useStyles();
  const fileInputRef: any = useRef();

  const handleInputFileChange = (event: React.ChangeEvent<any>) => {
    form.setFieldValue(field.name, event.currentTarget.files[0]);
    form.handleChange(event);
  };

  return (
    <>
      <Button
        variant={variant}
        fullWidth
        onClick={() => {
          fileInputRef.current.click();
          form.setTouched({ [field.name]: true });
        }}
        className={Boolean(form.errors[field.value?.name] && form.touched[field.name]) ? classes.error : ""}
      >
        {!form.errors[field.name] ? `تمت إضافة شهادة (${field.value?.name || ""})` : label}
      </Button>
      <Input
        type="file"
        inputProps={{ accept }}
        className={classes.hidden}
        inputRef={fileInputRef}
        onChange={handleInputFileChange}
        onBlur={form.handleBlur}
      />
      {Boolean(form.errors[field.name] && form.touched[field.name]) ? (
        <FormHelperText error>{form.errors[field.name]}</FormHelperText>
      ) : null}
    </>
  );
};
export default CustomFileUpload;
