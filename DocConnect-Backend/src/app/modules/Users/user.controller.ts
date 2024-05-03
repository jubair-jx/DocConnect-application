import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { paginationFilteringfield, userFilterAbleField } from "./user.constant";
import { userServices } from "./user.services";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdminIntoDB(req);
    res.status(200).json({
      success: true,
      message: "Admin successfully created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};
const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.createDoctorIntoDB(req);

    res.status(200).json({
      success: true,
      message: "Doctor successfully created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};
const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.createPatientIntoDB(req);

    res.status(200).json({
      success: true,
      message: "Patient successfully created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};

const getAllUser = catchAsync(async (req, res) => {
  const filters = pickFilterData(req.query, userFilterAbleField);
  const options = pickFilterData(req.query, paginationFilteringfield);

  const result = await userServices.getAllUserFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data has been retrievd successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.userStatusUpdateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data has been updated successfully",
    data: result,
  });
});

const getUserProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;
    const result = await userServices.getUserProfileFromDB(user as TAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile fetched successfully",
      data: result,
    });
  }
);

const updateUserProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;

    const result = await userServices.userProfileUpdate(user as TAuthUser, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUser,
  updateUserStatus,
  getUserProfile,
  updateUserProfile,
};
