import express from "express";
import { adminControllers } from "./admin.controller";

const adminRoutes = express.Router();

adminRoutes.get("/", adminControllers.getAllAdmin);
adminRoutes.get("/:id", adminControllers.getSingleAdmin);
adminRoutes.patch("/:id", adminControllers.updateAdminData);
adminRoutes.delete("/:id", adminControllers.deleteAdminData);
adminRoutes.delete("/soft/:id", adminControllers.softDeleteAdminData);

export default adminRoutes;
