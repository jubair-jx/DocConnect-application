import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminControllers } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";

const adminRoutes = express.Router();

adminRoutes.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.getAllAdmin
);
adminRoutes.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.getSingleAdmin
);
adminRoutes.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidationSchema.update),
  adminControllers.updateAdminData
);
adminRoutes.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.deleteAdminData
);
adminRoutes.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminControllers.softDeleteAdminData
);

export default adminRoutes;
