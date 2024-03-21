import { Admin, Prisma, UserStatus } from "@prisma/client";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TpaginationItems } from "../../interface/pagination.inteface";
import { userSearchAbleFields } from "./admin.constant";
import { TFilteringItems } from "./admin.interface";

const getAllAdminFromDB = async (
  params: TFilteringItems,
  options: TpaginationItems
) => {
  const { searchTerm, ...filterData } = params;

  console.log(options);

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
  //filtering : if isDleted is true then hide data from DB
  andCondition.push({
    isDeleted: false,
  });
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

const getSingleAdminFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin | any> => {
  const isExistData = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!isExistData) {
    throw new Error("This data is not exist");
  }

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  result;
};
const deleteDataById = async (id: string): Promise<Admin | null> => {
  const isExistData = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!isExistData) {
    throw new Error("This data is not exist");
  }
  const result = await prisma.$transaction(async (tx) => {
    const adminTableDataDelete = await tx.admin.delete({
      where: {
        id,
      },
    });
    await tx.user.delete({
      where: {
        email: adminTableDataDelete.email,
      },
    });
    return adminTableDataDelete;
  });

  return result;
};
const softDeleteDataById = async (id: string): Promise<Admin | null> => {
  const isExistData = await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!isExistData) {
    throw new Error("This data is not exist");
  }
  const result = await prisma.$transaction(async (tx) => {
    const adminTableDataDelete = await tx.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await tx.user.update({
      where: {
        email: adminTableDataDelete.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return adminTableDataDelete;
  });

  return result;
};

export const adminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateDataById,
  deleteDataById,
  softDeleteDataById,
};
