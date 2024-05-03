import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { paymentServices } from "./payment.services";

const createPayment = catchAsync(async (req: Request, res) => {
  const { appointmentId } = req.params;
  const result = await paymentServices.createPaymentIntoDB(appointmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment Initiate has been created",
    data: result,
  });
});
const validatePayment = catchAsync(async (req: Request, res) => {
  const result = await paymentServices.validatedPaymentIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment validated has been done",
    data: result,
  });
});

export const paymentControllers = {
  createPayment,
  validatePayment,
};
