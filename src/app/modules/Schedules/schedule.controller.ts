import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
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

const getAllFromDB = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pickFilterData(req.query, ["startDate", "endDate"]);
    const options = pickFilterData(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);

    const result = await ScheduleServices.getAllScheduleFromDB(
      filters,
      options,
      user as TAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Patients retrieval successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const SchedulesController = {
  createSchedule,
  getAllFromDB,
};
