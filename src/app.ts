import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./routes/routes";

const app: Application = express();
//cors for browser support
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//root routes
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "DocConnect Server is running now" });
});

//Initial main routes
app.use("/api/v1", router);
//global error handler
app.use(globalErrorHandler);

export default app;
