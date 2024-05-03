import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { SchedulesController } from "./schedule.controller";

const scheduleRoutes = Router();

scheduleRoutes.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SchedulesController.createSchedule
);
scheduleRoutes.get(
  "/",
  auth(UserRole.DOCTOR),
  SchedulesController.getAllFromDB
);
scheduleRoutes.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  SchedulesController.getByIdFromDB
);
scheduleRoutes.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SchedulesController.deleteFromDB
);

export default scheduleRoutes;
