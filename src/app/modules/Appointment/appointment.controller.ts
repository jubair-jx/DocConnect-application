import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { appointmentServices } from "./appointment.services";

const createDoctorSchedule = catchAsync(
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

export const appointmentControllers = {
  createDoctorSchedule,
};
