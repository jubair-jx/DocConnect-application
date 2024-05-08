import RUModal from "@/components/shared/Modal/RUModal";
import { TextField } from "@mui/material";
import React from "react";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchedulesModal = ({ open, setOpen }: TProps) => {
  return (
    <>
      <RUModal open={open} setOpen={setOpen} title={"Create Specialites"}>
        <TextField type="text" />
      </RUModal>
    </>
  );
};

export default SchedulesModal;
