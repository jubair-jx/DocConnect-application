"use client";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import SchedulesModal from "./components/schedulesModal";

const SpecialtiesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 text-sm rounded-md bg-blue-500 text-white"
      >
        Create Specialty
      </button>
      <SchedulesModal open={open} setOpen={setOpen} />
      {/* <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} /> */}
      <TextField size="small" placeholder="Search Specialist" />
    </Stack>
  );
};

export default SpecialtiesPage;
