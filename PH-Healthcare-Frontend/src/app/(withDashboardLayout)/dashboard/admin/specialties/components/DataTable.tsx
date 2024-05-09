import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "title", headerName: "title", width: 200 },
  {
    field: "icon",
    headerName: "icon",
    width: 100,
    renderCell: ({ row }) => {
      return console.log(row);
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
