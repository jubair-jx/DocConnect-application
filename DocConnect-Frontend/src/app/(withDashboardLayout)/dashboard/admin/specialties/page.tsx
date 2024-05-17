"use client";
import { useGetAllSpecialtyQuery } from "@/redux/api/specialtiesApi";
import { Box, Skeleton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DataTable from "./components/DataTable";
import SpecialitiesModal from "./components/specialitiesModel";

const SpecialtiesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllSpecialtyQuery({});

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 text-sm rounded-md bg-blue-500 text-white"
        >
          Create Specialty
        </button>
        <SpecialitiesModal open={open} setOpen={setOpen} />
        {/* <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} /> */}
        <TextField size="small" placeholder="Search Specialist" />
      </Stack>

      <Box>
        <h1 className="text-lg font-semibold mt-4 mb-4">
          Display All Specialites
        </h1>
        {!isLoading ? (
          <DataTable data={data} />
        ) : (
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SpecialtiesPage;
