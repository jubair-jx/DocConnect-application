import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
interface IDatePickerProps {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}
function RUDateFicker({
  name,
  size = "small",
  label,
  required,
  fullWidth,
  sx,
}: IDatePickerProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: "outlined",
                  fullWidth: fullWidth,
                },
              }}
              timezone="system"
              disablePast
              {...field}
              onChange={(date) => onChange(date)}
              value={value || Date.now()}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}

export default RUDateFicker;
