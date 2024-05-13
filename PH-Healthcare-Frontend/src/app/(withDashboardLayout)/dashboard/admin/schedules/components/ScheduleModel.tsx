import RUDateFicker from "@/components/Form/DateFicker";
import PHForm from "@/components/Form/PHFrom";
import RUModal from "@/components/shared/Modal/RUModal";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function ScheduleModel({ open, setOpen }: TProps) {
  const handleFormSubmit = async (values: FieldValues) => {
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
        </Grid>
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </PHForm>
    </RUModal>
  );
}

export default ScheduleModel;
