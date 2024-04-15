import { Request } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { ReviewServices } from "./review.services";

const createReview = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;
    const result = await ReviewServices.createReviewIntoDB(
      user as TAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your Review has been created",
      data: result,
    });
  }
);

export const ReviewControllers = {
  createReview,
};
