"use client";
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import { ISchedule } from "@/types/schedule";

import { dateFormatter } from "@/utils/DateFormatter";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ScheduleModel from "./components/ScheduleModel";

const SchedulesPage = () => {
  const { data, isLoading } = useGetAllSchedulesQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const schedules = data?.schedules;

  const meta = data?.meta;
  const handleDeleteSchedules = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      if (res?.id) {
        toast.success("Schedule deleted successfully");
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      console.log(schedule);
      return {
        sl: index + 1,
        id: schedule?.id,
        startDate: dateFormatter(schedule.startDateTime),
        endDate: dateFormatter(schedule.endDateTime),
        startTime: dayjs(schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  console.log(allSchedule);
  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton
            onClick={() => handleDeleteSchedules(row.id)}
            aria-label="delete"
          >
            <GridDeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Create Schedule
      </Button>
      <h1 className="text-lg font-semibold">
        Total Schedules : {schedules?.length}
      </h1>
      <ScheduleModel open={isModalOpen} setOpen={setIsModalOpen} />
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={allSchedule ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default SchedulesPage;
