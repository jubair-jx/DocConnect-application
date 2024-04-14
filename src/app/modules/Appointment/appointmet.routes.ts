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
appointmentRoutes.patch(
  "/status/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  appointmentControllers.updateAppointmentStatus
);

export default appointmentRoutes;
