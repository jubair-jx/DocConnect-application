import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ScheduleServices } from "./schedule.services";

const createSchedule = catchAsync(async (req: Request, res) => {
  const result = await ScheduleServices.createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedules has been created",
    data: result,
  });
});

export const SchedulesController = {
  createSchedule,
};
