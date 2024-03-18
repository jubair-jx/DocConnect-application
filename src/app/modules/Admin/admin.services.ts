import { Prisma, PrismaClient } from "@prisma/client";
import { userSearchAbleFields } from "./admin.constant";

const prisma = new PrismaClient();
const getAllAdminFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;

  const { limit, page } = options;

  const andCondition: Prisma.AdminWhereInput[] = [];
  //This condition for only search any items
  if (params.searchTerm) {
    andCondition.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //This condition for specific field, for example name, email, contactnumber, etc
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });
  return result;
};

export const adminServices = {
  getAllAdminFromDB,
};
