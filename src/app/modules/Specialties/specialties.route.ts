import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { fileUploader } from "../../../helpers/sendUploader";
import auth from "../../middlewares/auth";
import { specialitesValidation } from "./specialites.validation";
import { specialitesControllers } from "./specialties.controller";

const specialitesRoutes = Router();

specialitesRoutes.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = specialitesValidation.createSpecialitesValidation.parse(
      JSON.parse(req.body.data)
    );
    return specialitesControllers.createSpecialites(req, res, next);
  }
);

export default specialitesRoutes;
