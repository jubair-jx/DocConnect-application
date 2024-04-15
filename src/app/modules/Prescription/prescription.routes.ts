import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { PrescriptionControllers } from "./prescription.controller";

const prescriptionRoutes = Router();

prescriptionRoutes.post(
  "/",
  auth(UserRole.DOCTOR),
  PrescriptionControllers.createPrescription
);
prescriptionRoutes.get(
  "/my-prescription",
  auth(UserRole.PATIENT),
  PrescriptionControllers.getMyAllPrescriptionAsPatient
);
export default prescriptionRoutes;
