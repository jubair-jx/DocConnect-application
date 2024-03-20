import express from "express";
import { userControllers } from "./user.controller";

const userRoutes = express.Router();

userRoutes.post("/", userControllers.creatAdmin);

export default userRoutes;
