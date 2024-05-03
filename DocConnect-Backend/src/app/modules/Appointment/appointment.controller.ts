import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pickFilterData from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { appointmentFilterableFields } from "./appointment.constant";
import { appointmentServices } from "./appointment.services";

const createAppointment = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;
    const result = await appointmentServices.createAppointmentIntoDB(
      user as TAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment has been created",
      data: result,
    });
  }
);
const getMyAppointment = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;
    const filters = pickFilterData(req.query, appointmentFilterableFields);

    const options = pickFilterData(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);
    const result = await appointmentServices.getMyAppointmentFromDB(
      user as TAuthUser,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment has been created",
      data: result,
    });
  }
);

const updateAppointmentStatus = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;
    const result = await appointmentServices.updateAppointmentStatusIntoDB(
      id,
      status,
      user as TAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment has been updated successfully",
      data: result,
    });
  }
);

export const appointmentControllers = {
  createAppointment,
  getMyAppointment,
  updateAppointmentStatus,
};
