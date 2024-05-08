import RUFileUploader from "@/components/Form/FileUploader/RUFileUploader";
import PHForm from "@/components/Form/PHFrom";
import PHInput from "@/components/Form/PHInput";
import RUModal from "@/components/shared/Modal/RUModal";
import { modifyPayload } from "@/utils/FormDataPayload";
import { Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchedulesModal = ({ open, setOpen }: TProps) => {
  const handleFormSubmit = (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <>
      <RUModal open={open} setOpen={setOpen} title={"Create Specialites"}>
        <PHForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <PHInput name="title" label="Title" />
            </Grid>
            <Grid item md={6}>
              <RUFileUploader name="file" label="Upload File" />
            </Grid>
          </Grid>
          <button
            className="text-white bg-green-500 px-3 py-2 text-sm mt-3 rounded-md"
            type="submit"
          >
            Create
          </button>
        </PHForm>
      </RUModal>
    </>
  );
};

export default SchedulesModal;
