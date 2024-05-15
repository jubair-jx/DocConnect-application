import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import cron from "node-cron";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFound";
import { appointmentServices } from "./app/modules/Appointment/appointment.services";
import router from "./routes/routes";
const app: Application = express();
//cors for browser support
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    appointmentServices.cancelUnPaidAppointment();
  } catch (err) {
    console.log(err);
  }
});

//root routes
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "DocConnect Server is running now" });
});

//Initial main routes
app.use("/api/v1", router);
//global error handler
app.use(globalErrorHandler);
//not found routes
app.use(notFoundRoute);

export default app;
