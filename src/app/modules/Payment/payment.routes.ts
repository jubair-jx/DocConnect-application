import { Router } from "express";
import { paymentControllers } from "./payment.controller";

const paymentRoutes = Router();

paymentRoutes.post(
  "/init-payment/:appointmentId",
  paymentControllers.createPayment
);
paymentRoutes.get("/ipn", paymentControllers.validatePayment);

export default paymentRoutes;
