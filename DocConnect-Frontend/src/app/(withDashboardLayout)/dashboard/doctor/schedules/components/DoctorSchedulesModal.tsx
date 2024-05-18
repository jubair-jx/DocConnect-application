import RUModal from "@/components/shared/Modal/RUModal";
import LoadingButton from "@mui/lab/LoadingButton";

import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorSchedulesApi";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "sonner";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({ open, setOpen }: TProps) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).toISOString()
  );
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);
  const query: Record<string, any> = {};
  if (!!selectedDate) {
    query["startDate"] = dayjs(selectedDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDate"] = dayjs(selectedDate)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
  }

  const { data } = useGetAllSchedulesQuery(query);
  const schedules = data?.schedules;
  const [createDoctorSchedule, { isLoading }] =
    useCreateDoctorScheduleMutation();
  const onSubmit = async () => {
    try {
      const res = await createDoctorSchedule({
        scheduleIds: selectedScheduleIds,
      }).unwrap();

      if (res?.count) {
        toast.success("Schedule has been created successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RUModal open={open} setOpen={setOpen} title="Create Doctor Schedule">
      <Stack direction={"column"} gap={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Schedule"
            value={dayjs(selectedDate)}
            onChange={(newValue) =>
              setSelectedDate(dayjs(newValue).toISOString())
            }
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
        <MultipleSelectFieldChip
          setSelectedScheduleIds={setSelectedScheduleIds}
          selectedScheduleIds={selectedScheduleIds}
          schedules={schedules}
        />

        <LoadingButton
          size="small"
          onClick={onSubmit}
          loadingIndicator="Submitting..."
          variant="contained"
          loading={isLoading}
        >
          <span>Submit</span>
        </LoadingButton>
      </Stack>
    </RUModal>
  );
};

export default DoctorScheduleModal;
