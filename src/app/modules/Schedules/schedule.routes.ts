import { Router } from "express";
import { SchedulesController } from "./schedule.controller";

const scheduleRoutes = Router();

scheduleRoutes.post("/", SchedulesController.createSchedule);

export default scheduleRoutes;
