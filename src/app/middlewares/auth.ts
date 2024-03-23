import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import verifyToken from "../../helpers/helper.verifyToken";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      //now checking is token is available
      if (!token)
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized to access!!!"
        );
      //if token will take then we will check this token is verified
      const verifiedUser = verifyToken(
        token,
        config.jwt.jwt_secret_key as string
      );
      req.user = verifiedUser;
      if (roles.length && !roles.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!!!");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
