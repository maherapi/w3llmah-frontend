import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem as MuiMenuItem,
  Select,
  SelectProps,
} from "@material-ui/core";
import { FieldProps } from "formik";
import React from "react";

export interface SelectOption {
  text: string;
  value: string;
}

interface CustomProps {
  options: SelectOption[];
}
type Props = FieldProps & SelectProps & CustomProps;

const CustomSelect: React.FC<Props> = ({ options = [], variant = "outlined", field, form, ...props }) => {
  return (
    <FormControl variant={variant} error={Boolean(form.errors[field.name] && form.touched[field.name])} fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...field}
        {...props}
        variant={variant}
        fullWidth
        error={Boolean(form.errors[field.name] && form.touched[field.name])}
      >
        <MuiMenuItem value="" key="none" disabled>
          اختر
        </MuiMenuItem>
        {options.map((o) => (
          <MuiMenuItem value={o.value} key={o.value}>
            {o.text}
          </MuiMenuItem>
        ))}
      </Select>
      {Boolean(form.errors[field.name] && form.touched[field.name]) ? (
        <FormHelperText>{form.errors[field.name]}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CustomSelect;
