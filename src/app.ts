import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "DocConnect Server is running now" });
});

export default app;
