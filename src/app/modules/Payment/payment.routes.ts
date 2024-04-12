import { Router } from "express";
import { paymentControllers } from "./payment.controller";

const paymentRoutes = Router();

paymentRoutes.post("/init-payment", paymentControllers.createPayment);

export default paymentRoutes;
