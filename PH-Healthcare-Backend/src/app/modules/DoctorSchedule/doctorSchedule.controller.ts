import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { scheduleFilterableFields } from "./doctorSchedule.constant";
import { DoctorsSchedulesService } from "./doctorSchedule.services";

const createDoctorSchedule = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;
    const result = await DoctorsSchedulesService.createDoctorScheduleIntoDB(
      user as TAuthUser,
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

const getMyAllFromDB = catchAsync(
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

    const result = await DoctorsSchedulesService.getAllMyScheduleFromDB(
      filters,
      options,
      user as TAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedules retrieval successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

//TODO: Due Issues
const deleteFromDB = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const result = await DoctorsSchedulesService.deleteFromDB(
      user as TAuthUser,
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctors Schedule Deleted successfully",
      data: result,
    });
  }
);
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pickFilterData(req.query, scheduleFilterableFields);
  const options = pickFilterData(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ]);
  const result = await DoctorsSchedulesService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Schedule retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});
export const DoctorSchedulesController = {
  createDoctorSchedule,
  getMyAllFromDB,
  deleteFromDB,
  getAllFromDB,
};
