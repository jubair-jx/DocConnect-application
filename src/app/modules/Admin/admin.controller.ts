import { Request, Response } from "express";
import pickFilterData from "../../../shared/pick";
import {
  paginationFilteringfield,
  userFilterAbleField,
} from "./admin.constant";
import { adminServices } from "./admin.services";

const getAllAdmin = async (req: Request, res: Response) => {
  const filters = pickFilterData(req.query, userFilterAbleField);
  const options = pickFilterData(req.query, paginationFilteringfield);

  const result = await adminServices.getAllAdminFromDB(filters, options);

  res.status(200).json({
    status: true,
    message: "Admin data has been retrievd successfully",
    data: result,
  });
};

export const adminControllers = {
  getAllAdmin,
};
