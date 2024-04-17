import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TAuthUser } from "../../interface/common";
import { MetaServices } from "./meta.services";

const getAllMetaData = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;

    const result = await MetaServices.getAllMetaDataBasedOnRole(
      user as TAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meta data has been successfully fetched",

      data: result,
    });
  }
);

export const MetaController = {
  getAllMetaData,
};
