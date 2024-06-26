import { Router } from "express";
import { patientControllers } from "./patient.controller";

const patientRoutes = Router();

patientRoutes.get("/", patientControllers.getAllFromDB);
patientRoutes.get("/:id", patientControllers.getByIdFromDB);
patientRoutes.patch("/:id", patientControllers.updatePatientData);
patientRoutes.delete("/:id", patientControllers.deletePatientData);

export default patientRoutes;
