export type TCreateSchedule = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

export type TFilterInput = {
  startDate?: string | undefined;
  endDate?: string | undefined;
};
