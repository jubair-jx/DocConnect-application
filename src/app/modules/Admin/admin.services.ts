import { Prisma } from "@prisma/client";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { userSearchAbleFields } from "./admin.constant";

const getAllAdminFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;

  const { limit, sortBy, sortOrder, skip, page } =
    helperFunction.calculatePaginationFiltering(options);

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
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const totalCount = await prisma.admin.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      totalCount,
    },

    data: result,
  };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const adminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
};
