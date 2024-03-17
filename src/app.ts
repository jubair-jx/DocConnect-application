import cors from "cors";
import express, { Application, Request, Response } from "express";
import adminRoutes from "./app/modules/Admin/admin.route";
import userRoutes from "./app/modules/Users/user.route";

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
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);

export default app;
