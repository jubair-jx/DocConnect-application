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
//task-03
doctorRoutes.get("/", doctorControllers.getAllFromDB);
//task 4
doctorRoutes.get("/:id", doctorControllers.getByIdFromDB);
//task 5
doctorRoutes.delete(
  "/:id",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  doctorControllers.deleteFromDB
);
// task 6
doctorRoutes.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  doctorControllers.softDelete
);
export default doctorRoutes;
