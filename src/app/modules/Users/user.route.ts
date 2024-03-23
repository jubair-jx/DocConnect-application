import express from "express";
import auth from "../../middlewares/auth";
import { userControllers } from "./user.controller";

const userRoutes = express.Router();

userRoutes.post("/", auth("ADMIN"), userControllers.creatAdmin);

export default userRoutes;
