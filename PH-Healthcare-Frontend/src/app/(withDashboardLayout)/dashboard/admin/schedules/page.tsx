"use client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import ScheduleModel from "./components/ScheduleModel";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Box>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Create Schedule
      </Button>
      <ScheduleModel open={isModalOpen} setOpen={setIsModalOpen} />
      {/* {!isLoading ? (
     <Box my={2}>
        <DataGrid rows={allSchedule ?? []} columns={columns} />
     </Box>
  ) : (
     <h1>Loading.....</h1>
  )} */}
    </Box>
  );
};

export default SchedulesPage;
