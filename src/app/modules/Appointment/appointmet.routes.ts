import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { appointmentControllers } from "./appointment.controller";

const appointmentRoutes = Router();

appointmentRoutes.post(
  "/",
  auth(UserRole.PATIENT),
  appointmentControllers.createAppointment
);
appointmentRoutes.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  appointmentControllers.getMyAppointment
);

export default appointmentRoutes;
