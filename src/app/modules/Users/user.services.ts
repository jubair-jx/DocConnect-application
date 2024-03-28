import { Admin, Doctors, Patient, Prisma, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import { fileUploader } from "../../../helpers/sendUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interface/cloud.interface";
import { TpaginationItems } from "../../interface/pagination.inteface";
import { userSearchAbleFields } from "./user.constant";
const createAdminIntoDB = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloud = await fileUploader.uploadToCloudinary(file);
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
const createDoctorIntoDB = async (req: Request): Promise<Doctors> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloud = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloud?.secure_url;
  }
  const hashPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const createDoctor = await tx.doctors.create({
      data: req.body.doctor,
    });
    return createDoctor;
  });
  return result;
};
const createPatientIntoDB = async (req: Request): Promise<Patient> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloud = await fileUploader.uploadToCloudinary(file);
    req.body.patient.profilePhoto = uploadToCloud?.secure_url;
  }
  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.patient.email,
    password: hashPassword,
    role: UserRole.PATIENT,
  };
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createPatient = await tx.patient.create({
      data: req.body.patient,
    });

    return createPatient;
  });
  return result;
};

const getAllUserFromDB = async (params: any, options: TpaginationItems) => {
  const { searchTerm, ...filterData } = params;

  const { limit, sortBy, sortOrder, skip, page } =
    helperFunction.calculatePaginationFiltering(options);

  const andCondition: Prisma.UserWhereInput[] = [];
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.user.findMany({
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
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      patient: true,
    },
  });

  const totalCount = await prisma.user.count({
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

const userStatusUpdateIntoDB = async (id: string, status: UserRole) => {
  const checkUserExists = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const userStatusUpdate = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });
  return userStatusUpdate;
};

export const userServices = {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
  getAllUserFromDB,
  userStatusUpdateIntoDB,
};
