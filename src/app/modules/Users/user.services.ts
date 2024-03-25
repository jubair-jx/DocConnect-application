import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { fileUploader } from "../../../helpers/sendUploader";
import prisma from "../../../shared/prisma";
const createAdminIntoDB = async (req: any) => {
  console.log("file", req.file);
  console.log("data", req.body);
  const file = req.file;
  if (file) {
    const uploadToCloud: any = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloud?.secure_url;
    console.log(req.body);
  }
  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const createAdmin = await tx.admin.create({
      data: req.body.admin,
    });
    return createAdmin;
  });
  return result;
};

export const userServices = {
  createAdminIntoDB,
};
