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

export const specialiteServices = {
  createSpecialitesIntoDB,
};
