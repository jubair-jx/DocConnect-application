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

export default scheduleRoutes;
