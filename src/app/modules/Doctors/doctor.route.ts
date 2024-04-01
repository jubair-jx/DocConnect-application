import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { doctorServices } from "./doctor.services";

const doctorRoutes = Router();

doctorRoutes.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  doctorServices.updateDoctorInfo
);

export default doctorRoutes;
