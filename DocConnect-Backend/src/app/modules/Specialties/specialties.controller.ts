import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialiteServices } from "./specialties.services";

const createSpecialites = catchAsync(async (req: Request, res) => {
  const result = await specialiteServices.createSpecialitesIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialites has been created",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await specialiteServices.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

export const specialitesControllers = {
  createSpecialites,
  getAllFromDB,
};
