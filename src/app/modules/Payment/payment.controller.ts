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

export const paymentControllers = {
  createPayment,
};
