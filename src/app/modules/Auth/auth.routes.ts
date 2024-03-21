import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRoutes = Router();

AuthRoutes.post("/login", AuthController.loginUser);
AuthRoutes.post("/refresh-token", AuthController.refreshToken);

export default AuthRoutes;
