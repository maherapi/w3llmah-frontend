import { FieldProps } from "formik";
import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

interface CustomProps {}
type Props = FieldProps & TextFieldProps & CustomProps;

const CustomTextField: React.FC<Props> = ({ variant = "outlined", field, form, type = "text", ...props }) => {
  return (
    <TextField
      {...field}
      {...props}
      variant={variant}
      inputProps={{type}}
      fullWidth
      error={Boolean(form.errors[field.name] && form.touched[field.name])}
      helperText={Boolean(form.errors[field.name] && form.touched[field.name]) ? form.errors[field.name] : ""}
    ></TextField>
  );
};

export default CustomTextField;
