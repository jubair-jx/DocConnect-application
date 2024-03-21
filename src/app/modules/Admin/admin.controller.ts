import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import {
  paginationFilteringfield,
  userFilterAbleField,
} from "./admin.constant";
import { adminServices } from "./admin.services";

const getAllAdmin = catchAsync(async (req, res) => {
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
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data has been retrievd successfully",
    data: result,
  });
});
const updateAdminData = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await adminServices.updateDataById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data has been updated successfully",
    data: result,
  });
});
const deleteAdminData = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await adminServices.deleteDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data has been deleted successfully",
    data: result,
  });
});
const softDeleteAdminData = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await adminServices.softDeleteDataById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data has been deleted successfully",
    data: result,
  });
});

export const adminControllers = {
  getAllAdmin,
  deleteAdminData,
  getSingleAdmin,
  updateAdminData,
  softDeleteAdminData,
};
