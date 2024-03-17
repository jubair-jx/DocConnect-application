import express from "express";
import { userControllers } from "./user.controller";

const userRoutes = express.Router();

userRoutes.post("/users", userControllers.creatAdmin);

export default userRoutes;
