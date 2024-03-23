import { UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import generateToken from "../../../helpers/helper.generateToken";
import verifyToken from "../../../helpers/helper.verifyToken";
import prisma from "../../../shared/prisma";
import { TLogin } from "./auth.interface";
import senderEmail from "./sendMail";
const loginIntoDB = async (payload: TLogin) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
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
    { email: isExistUser.email, role: isExistUser.role },
    config.jwt.jwt_secret_key as string,
    config.jwt.jwt_expires_in as string
  );

  const refreshToken = generateToken(
    { email: isExistUser.email, role: isExistUser.role },
    config.jwt.refresh_token_key as string,
    config.jwt.refresh_token_expires_in as string
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
    decodedData = verifyToken(token, config.jwt.refresh_token_key as string);
  } catch (err) {
    throw new Error("You are not authorized!!");
  }

  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = generateToken(
    { email: isExistUser.email, role: isExistUser.role },
    config.jwt.jwt_secret_key as string,
    config.jwt.jwt_expires_in as string
  );
  return {
    accessToken,
    needPasswordChange: isExistUser.needPasswordChange,
  };
};
const changePassword = async (userData: any, payload: any) => {
  const isExistUser = (await prisma.user.findUnique({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
  })) as any;

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    isExistUser.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
  return {
    message: "Password changed successfully!",
  };
};

const forgetPassword = async (userData: any) => {
  const isExistUser = (await prisma.user.findUnique({
    where: {
      email: userData?.email,
      status: UserStatus.ACTIVE,
    },
  })) as any;

  const forgetPassToken = generateToken(
    { email: isExistUser.email, role: isExistUser.role },
    config.jwt.reset_pass_token_key as string,
    config.jwt.reset_pass_token_expires_in as string
  );

  const resetPassLink =
    config.reset_pass_link +
    `?email=${isExistUser.email}&token=${forgetPassToken}`;

  senderEmail(
    isExistUser?.email,
    `
    <div>
        <p>Dear User,</p>
        <p>Your password reset link
            <a href=${resetPassLink}>
                <button>
                    Reset Password
                </button>
            </a>
        </p>

    </div>
    `
  );
};
const resetPassword = async (
  token: string,
  payload: { email: string; password: string }
) => {
  const isExistUser = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isVerifiedToken = verifyToken(
    token,
    config.jwt.reset_pass_token_key as Secret
  );
  if (!isVerifiedToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  await prisma.user.update({
    where: {
      email: isExistUser.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
};
export const AuthServices = {
  loginIntoDB,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
