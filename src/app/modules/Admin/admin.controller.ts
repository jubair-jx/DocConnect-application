import { Request, Response } from "express";
import { adminServices } from "./admin.services";

const getAllAdmin = async (req: Request, res: Response) => {
  const result = await adminServices.getAllAdminFromDB(req.query);

  res.status(200).json({
    status: true,
    message: "Admin data has been retrievd successfully",
    data: result,
  });
};

export const adminControllers = {
  getAllAdmin,
};
