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
doctorScheduleRoutes.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  DoctorSchedulesController.getAllFromDB
);

doctorScheduleRoutes.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  DoctorSchedulesController.getMyAllFromDB
);

//TODO:Due issues
doctorScheduleRoutes.delete(
  "/:id",
  // auth(UserRole.DOCTOR),
  DoctorSchedulesController.deleteFromDB
);
export default doctorScheduleRoutes;
