import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { patientFilterableFields } from "./patient.constant";
import { patientServices } from "./patient.services";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pickFilterData(req.query, patientFilterableFields);
  const options = pickFilterData(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
  ]);

  const result = await patientServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patients retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await patientServices.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient retrieval successfully",
    data: result,
  });
});
const updatePatientData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await patientServices.updatePatientIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient update successfully",
    data: result,
  });
});

export const patientControllers = {
  getAllFromDB,
  getByIdFromDB,
  updatePatientData,
};
