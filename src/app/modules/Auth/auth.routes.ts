import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { AuthController } from "./auth.controller";

const AuthRoutes = Router();

AuthRoutes.post("/login", AuthController.loginUser);
AuthRoutes.post("/refresh-token", AuthController.refreshToken);
AuthRoutes.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.SUPER_ADMIN, UserRole.PATIENT),
  AuthController.changePassword
);
AuthRoutes.post(
  "/forget-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.SUPER_ADMIN, UserRole.PATIENT),
  AuthController.forgetPassword
);

export default AuthRoutes;
