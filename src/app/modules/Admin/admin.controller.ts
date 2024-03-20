import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../helpers/sendResponse";
import pickFilterData from "../../../shared/pick";
import {
  paginationFilteringfield,
  userFilterAbleField,
} from "./admin.constant";
import { adminServices } from "./admin.services";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pickFilterData(req.query, userFilterAbleField);
    const options = pickFilterData(req.query, paginationFilteringfield);

    const result = await adminServices.getAllAdminFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins data has been retrievd successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminServices.getSingleAdminFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data has been retrievd successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const updateAdminData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminServices.updateDataById(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data has been updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const deleteAdminData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminServices.deleteDataById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data has been deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const softDeleteAdminData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await adminServices.softDeleteDataById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data has been deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const adminControllers = {
  getAllAdmin,
  deleteAdminData,
  getSingleAdmin,
  updateAdminData,
  softDeleteAdminData,
};
