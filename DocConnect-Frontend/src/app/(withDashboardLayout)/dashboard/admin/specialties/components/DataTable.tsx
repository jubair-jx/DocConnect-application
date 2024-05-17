"use client";
import { useDeleteSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";
import { toast } from "sonner";

export default function DataTable({ data }: any) {
  const [deleteSpecialty] = useDeleteSpecialtyMutation();
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialty(id).unwrap();

      if (res?.id) {
        toast.success("Specialty has been deleted");
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };
  const columns: GridColDef[] = [
    { field: "title", headerName: "title", width: 400 },
    {
      field: "icon",
      headerName: "icon",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box my={1}>
            <Image
              className="rounded-md"
              src={row.icon}
              width={30}
              height={30}
              alt="icon"
            />
          </Box>
        );
      },
    },
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
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
}
