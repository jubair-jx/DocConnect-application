import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
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

const getAllFromDB = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pickFilterData(req.query, [
      "startDate",
      "endDate",
      "isBooked",
    ]);
    const options = pickFilterData(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);

    const result = await DoctorsSchedulesService.getAllDoctorScheduleFromDB(
      filters,
      options,
      user as TAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctors Schedules retrieval successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const DoctorSchedulesController = {
  createDoctorSchedule,
  getAllFromDB,
};
