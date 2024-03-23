import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { userControllers } from "./user.controller";

const userRoutes = express.Router();

userRoutes.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userControllers.creatAdmin
);

export default userRoutes;
