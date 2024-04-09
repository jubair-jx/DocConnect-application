import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { DoctorsSchedulesService } from "./doctorSchedule.services";

const createDoctorSchedule = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;
    const result = await DoctorsSchedulesService.createDoctorScheduleIntoDB(
      user,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedules has been created",
      data: result,
    });
  }
);

export const DoctorSchedulesController = {
  createDoctorSchedule,
};
