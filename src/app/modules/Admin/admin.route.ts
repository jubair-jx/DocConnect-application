import express from "express";
import { adminControllers } from "./admin.controller";

const adminRoutes = express.Router();

adminRoutes.get("/admin", adminControllers.getAllAdmin);
adminRoutes.get("/admin/:id", adminControllers.getSingleAdmin);

export default adminRoutes;
