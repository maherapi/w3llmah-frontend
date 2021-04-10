import { TextField, TextFieldProps } from "@material-ui/core";
import { FieldProps } from "formik";
import React, { useState } from "react";

interface CustomProps {}

type Props = CustomProps & FieldProps & TextFieldProps;

const CustomDatePicker: React.FC<Props> = ({ variant = "outlined", field, form, ...props }) => {
  const [inputType, setInputType] = useState("text");
  return (
    <TextField
      {...field}
      {...props}
      type={inputType}
      variant={variant}
      fullWidth
      onFocus={() => setInputType("date")}
      onBlur={(event) => {
        setInputType("text")
        form.handleBlur(event);
      }}
      error={Boolean(form.errors[field.name] && form.touched[field.name])}
      helperText={Boolean(form.errors[field.name] && form.touched[field.name]) ? form.errors[field.name] : ""}
    ></TextField>
  );
};

export default CustomDatePicker;
