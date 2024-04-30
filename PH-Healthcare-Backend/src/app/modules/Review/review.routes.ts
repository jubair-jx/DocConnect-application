import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { ReviewControllers } from "./review.controller";

const reviewRoutes = Router();

reviewRoutes.post("/", auth(UserRole.PATIENT), ReviewControllers.createReview);
//TODO : You will be make one api for get all reviews and my reviews, UserRole should be for Admin and Super Admin,
//Note : My review for only Patient access

export default reviewRoutes;
