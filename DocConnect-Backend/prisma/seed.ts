import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../src/shared/prisma";
const createSuperAdminIntoDB = async () => {
  const password = await bcrypt.hash("super123456", 12);
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });
    if (isExistSuperAdmin) {
      console.log("Super Admin is already exist on DB");
    }

    const createSuperAdmin = await prisma.user.create({
      data: {
        email: "jubair-super@mail.com",
        password,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: { name: "Mohammad Jubair", contactNumber: "12342654256" },
        },
      },
    });
    console.log("Super Admin has been created successfully", createSuperAdmin);
  } catch (err) {
    console.error("Bro!!! Super Admin is not created");
  } finally {
    prisma.$disconnect();
  }
};

createSuperAdminIntoDB();
