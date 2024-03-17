import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAllAdminFromDB = async (params: any) => {
  const andCondition: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: [
        {
          name: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereCondition,
  });
  return result;
};

export const adminServices = {
  getAllAdminFromDB,
};
