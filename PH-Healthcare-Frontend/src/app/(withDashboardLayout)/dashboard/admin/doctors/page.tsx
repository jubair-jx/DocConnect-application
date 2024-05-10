"use client";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorsApi";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { useState } from "react";
import DoctorModal from "./components/DoctorModal";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  query["searchTerm"] = searchTerm;
  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
  const doctors = data?.doctors;
  const meta = data?.meta;
  const handleDelete = (id: string) => {
    try {
    } catch (err) {}
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "experience", headerName: "Experience", flex: 1 },
    { field: "appointmentFee", headerName: "AppointmentFee", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <GridDeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <button
          className="px-3 py-2 text-white text-sm rounded-md bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Doctor
        </button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="search doctors"
        />
      </Stack>

      <Box>
        <h1 className="text-lg font-semibold mt-4 mb-4">Display All Doctors</h1>
        {!isLoading ? (
          <DataGrid rows={doctors} columns={columns} />
        ) : (
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DoctorsPage;
