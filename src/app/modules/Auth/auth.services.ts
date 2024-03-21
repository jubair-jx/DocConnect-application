import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../../../helpers/helper.generateToken";
import prisma from "../../../shared/prisma";
import { TLogin } from "./auth.interface";
const loginIntoDB = async (payload: TLogin) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    isExistUser.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }
  const accessToken = generateToken(
    { email: isExistUser.email, password: isExistUser.password },
    "abcdef",
    "10min"
  );

  const refreshToken = generateToken(
    { email: isExistUser.email, password: isExistUser.password },
    "abcdefasdfafsaga",
    "30d"
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: isExistUser.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwt.verify(token, "abcdefasdfafsaga");
  } catch (err) {
    throw new Error("You are not authorized!!");
  }

  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
    },
  });

  const accessToken = generateToken(
    { email: isExistUser.email, role: isExistUser.role },
    "abcdef",
    "10min"
  );
  return {
    accessToken,

    needPasswordChange: isExistUser.needPasswordChange,
  };
};

export const AuthServices = {
  loginIntoDB,
  refreshToken,
};
