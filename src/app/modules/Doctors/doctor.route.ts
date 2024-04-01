import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { doctorControllers } from "./doctor.controller";

const doctorRoutes = Router();

doctorRoutes.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  doctorControllers.updateDoctorProfile
);

export default doctorRoutes;
