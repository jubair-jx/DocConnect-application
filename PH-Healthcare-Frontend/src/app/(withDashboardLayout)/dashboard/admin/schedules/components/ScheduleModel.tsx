import RUDateFicker from "@/components/Form/DateFicker";
import PHForm from "@/components/Form/PHFrom";
import RUTimePicker from "@/components/Form/RUTimeFicker";
import RUModal from "@/components/shared/Modal/RUModal";
import dateFormatter from "@/utils/DateFormatter";
import timeFormatter from "@/utils/TimeFormatter";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function ScheduleModel({ open, setOpen }: TProps) {
  const handleFormSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    console.log(values);
    try {
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <RUModal open={open} setOpen={setOpen} title="Create Schedule">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <RUDateFicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={6}>
            <RUDateFicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <RUTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <RUTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </PHForm>
    </RUModal>
  );
}

export default ScheduleModel;
