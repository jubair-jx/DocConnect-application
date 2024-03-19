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
    message: "Admins data has been retrievd successfully",
    meta: result.meta,
    data: result.data,
  });
};

const getSingleAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminServices.getSingleAdminFromDB(id);

    res.status(200).json({
      status: true,
      message: "Admin data has been retrievd successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      err,
    });
  }
};
const updateAdminData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await adminServices.updateDataById(id, req.body);

    res.status(200).json({
      status: true,
      message: "Admin data has been updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      err,
    });
  }
};
const deleteAdminData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await adminServices.deleteDataById(id);

    res.status(200).json({
      status: true,
      message: "Admin data has been deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      err,
    });
  }
};

export const adminControllers = {
  getAllAdmin,
  deleteAdminData,
  getSingleAdmin,
  updateAdminData,
};
