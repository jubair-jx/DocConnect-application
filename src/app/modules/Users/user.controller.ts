import { Request, Response } from "express";
import { userServices } from "./user.services";

const creatAdmin = async (req: Request, res: Response) => {
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

export const userControllers = {
  creatAdmin,
};
