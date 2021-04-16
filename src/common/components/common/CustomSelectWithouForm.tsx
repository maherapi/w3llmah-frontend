import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem as MuiMenuItem,
  Select,
  SelectProps,
} from "@material-ui/core";
import React from "react";

export interface SelectOption {
  text: string;
  value: string;
}

interface CustomProps {
  options: SelectOption[];
  error?: string;
}
type Props = SelectProps & CustomProps;

const CustomSelectWithoutForm: React.FC<Props> = ({ options = [], variant = "outlined", error, ...props }) => {
  return (
    <FormControl variant={variant} error={Boolean(error)} fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props} variant={variant} fullWidth error={Boolean(error)}>
        <MuiMenuItem value="" key="none" disabled>
          اختر
        </MuiMenuItem>
        {options.map((o) => (
          <MuiMenuItem value={o.value} key={o.value}>
            {o.text}
          </MuiMenuItem>
        ))}
      </Select>
      {Boolean(error) ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};

export default CustomSelectWithoutForm;
