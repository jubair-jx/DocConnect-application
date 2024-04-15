import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { PrescriptionServices } from "./prescription.services";

const createPrescription = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;

    const result = await PrescriptionServices.prescriptionCreatingIntoDB(
      user as TAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription has been created successfully",
      data: result,
    });
  }
);

const getMyAllPrescriptionAsPatient = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;

    const options = pickFilterData(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);

    const result = await PrescriptionServices.getMyPrescriptionAsPatientFromDB(
      user as TAuthUser,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Prescription retrieval successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const PrescriptionControllers = {
  createPrescription,
  getMyAllPrescriptionAsPatient,
};
