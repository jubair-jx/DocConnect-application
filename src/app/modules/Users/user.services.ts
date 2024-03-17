import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const createAdminIntoDB = async (data: any) => {
  const hashPassword = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const createAdmin = await tx.admin.create({
      data: data.admin,
    });

    return createAdmin;
  });
  return result;
};

export const userServices = {
  createAdminIntoDB,
};
