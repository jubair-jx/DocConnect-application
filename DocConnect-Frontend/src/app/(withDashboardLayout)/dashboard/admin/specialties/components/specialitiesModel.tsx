import RUFileUploader from "@/components/Form/FileUploader/RUFileUploader";
import PHForm from "@/components/Form/PHFrom";
import PHInput from "@/components/Form/PHInput";
import RUModal from "@/components/shared/Modal/RUModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/FormDataPayload";
import { Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialitiesModal = ({ open, setOpen }: TProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();

      if (res?.id) {
        toast.success("Specialites has been created");
        setOpen(false);
      }
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

export default SpecialitiesModal;
