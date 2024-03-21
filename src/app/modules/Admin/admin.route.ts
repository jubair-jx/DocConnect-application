import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminControllers } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";

const adminRoutes = express.Router();

adminRoutes.get("/", adminControllers.getAllAdmin);
adminRoutes.get("/:id", adminControllers.getSingleAdmin);
adminRoutes.patch(
  "/:id",
  validateRequest(adminValidationSchema.update),
  adminControllers.updateAdminData
);
adminRoutes.delete("/:id", adminControllers.deleteAdminData);
adminRoutes.delete("/soft/:id", adminControllers.softDeleteAdminData);

export default adminRoutes;
