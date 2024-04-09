import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { DoctorSchedulesController } from "./doctorSchedule.controller";

const doctorScheduleRoutes = Router();

doctorScheduleRoutes.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  DoctorSchedulesController.createDoctorSchedule
);

export default doctorScheduleRoutes;
