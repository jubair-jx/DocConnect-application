"use client";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorsApi";
import { useDebounce } from "@/redux/hooks";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Skeleton, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import DoctorModal from "./components/DoctorModal";
const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  const debounce = useDebounce({ searchQuery: searchTerm, delay: 700 });
  if (!!debounce) {
    query["searchTerm"] = searchTerm;
  }
  const [deleteDoctor] = useDeleteDoctorMutation();
  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
  const doctors = data?.doctors;
  const meta = data?.meta;
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.warning("Doctor has been deleted now!!!");
      }
    } catch (err) {
      toast.error("Doctor not deleted now!!!");
    }
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
          <>
            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <GridDeleteIcon />
            </IconButton>
          </>
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
