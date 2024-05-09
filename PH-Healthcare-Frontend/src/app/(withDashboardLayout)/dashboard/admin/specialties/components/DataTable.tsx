import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";

const handleDelete = (id: string) => {
  console.log(id);
};

const columns: GridColDef[] = [
  { field: "title", headerName: "title", width: 300 },
  {
    field: "icon",
    headerName: "icon",
    width: 300,
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
    width: 100,
    renderCell: ({ row }) => {
      return (
        <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
          <GridDeleteIcon />
        </IconButton>
      );
    },
  },
];

export default function DataTable({ data }: any) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
}
