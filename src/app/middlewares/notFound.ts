import { Request, Response } from "express";
import httpStatus from "http-status";
const notFoundRoute = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: {
      path: req.originalUrl,
      message: "your requested api url is not available",
    },
  });
};

export default notFoundRoute;
