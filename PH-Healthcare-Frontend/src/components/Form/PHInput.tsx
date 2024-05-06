import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputField = {
  name: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  type?: string;
  label?: string;
  sx?: SxProps;
  placeholder?: string;
  required: boolean;
};

const PHInput = ({
  size = "small",
  type = "text",
  label,
  fullWidth,
  name,
  sx,
  placeholder,
  required,
}: TInputField) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          sx={{ ...sx }}
          placeholder={label}
          required={required}
          {...field}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

export default PHInput;
