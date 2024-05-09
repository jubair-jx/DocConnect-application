import { Specialties } from "@prisma/client";
import { Request } from "express";
import { fileUploader } from "../../../helpers/sendUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interface/cloud.interface";

const createSpecialitesIntoDB = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const createSpecialites = await prisma.specialties.create({ data: req.body });
  return createSpecialites;
};
const getAllFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
};
const deleteSpecialtyIntoDB = async (id: string) => {
  await prisma.specialties.findUniqueOrThrow({
    where: { id },
  });
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export const specialiteServices = {
  createSpecialitesIntoDB,
  getAllFromDB,
  deleteSpecialtyIntoDB,
};
