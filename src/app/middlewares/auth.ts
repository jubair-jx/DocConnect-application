import { NextFunction, Request, Response } from "express";
import config from "../../config";
import verifyToken from "../../helpers/helper.verifyToken";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      //now checking is token is available
      if (!token) throw new Error("You are not authorized to access!!!");
      //if token will take then we will check this token is verified
      const verifiedUser = verifyToken(
        token,
        config.jwt.jwt_secret_key as string
      );

      if (roles.length && !roles.includes(verifiedUser?.role)) {
        throw new Error("You are not allowed to access");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
