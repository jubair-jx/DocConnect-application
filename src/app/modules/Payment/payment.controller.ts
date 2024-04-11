import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { paymentServices } from "./payment.services";

const createPayment = catchAsync(async (req: Request, res) => {
  const result = await paymentServices.createPaymentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedules has been created",
    data: result,
  });
});

export const paymentControllers = {
  createPayment,
};
