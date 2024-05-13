import PHForm from "@/components/Form/PHFrom";
import RUModal from "@/components/shared/Modal/RUModal";
import { Button } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function ScheduleModel({ open, setOpen }: TProps) {
  const handleFormSubmit = async (values: FieldValues) => {};
  return (
    <RUModal open={open} setOpen={setOpen} title="Create Schedule">
      <PHForm onSubmit={handleFormSubmit}>
        {/* <Grid container spacing={2} sx={{ width: "400px" }}>
        <Grid item md={12}>
          <PHDatePicker name="startDate" label="Start Date" />
        </Grid>
        <Grid item md={12}>
          <PHDatePicker name="endDate" label="End Date" />
        </Grid>
        <Grid item md={6}>
          <PHTimePicker name="startTime" label="Start Time" />
        </Grid>
        <Grid item md={6}>
          <PHTimePicker name="endTime" label="End Time" />
        </Grid>
      </Grid> */}
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </PHForm>
    </RUModal>
  );
}

export default ScheduleModel;
