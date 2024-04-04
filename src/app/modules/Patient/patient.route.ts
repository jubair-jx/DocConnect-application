import { Router } from "express";
import { patientControllers } from "./patient.controller";

const patientRoutes = Router();

patientRoutes.get("/", patientControllers.getAllFromDB);
patientRoutes.get("/:id", patientControllers.getByIdFromDB);

export default patientRoutes;
