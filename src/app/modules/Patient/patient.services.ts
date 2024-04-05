import { Patient, Prisma } from "@prisma/client";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TpaginationItems } from "../../interface/pagination.inteface";
import { patientSearchableFields } from "./patient.constant";
import { IPatientFilterRequest, IPatientUpdate } from "./patient.interface";

const getAllFromDB = async (
  filters: IPatientFilterRequest,
  options: TpaginationItems
) => {
  const { limit, page, skip } =
    helperFunction.calculatePaginationFiltering(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });
  const totalCount = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      totalCount,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });
  return result;
};

const updatePatientIntoDB = async (
  id: string,
  payload: Partial<IPatientUpdate>
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;

  const isExistPatient = await prisma.patient.findUnique({
    where: {
      id,
    },
  });

  if (!isExistPatient) {
    throw new Error("Patient not found");
  }

  const result = await prisma.$transaction(async (tsClient) => {
    //update patient information
    await tsClient.patient.update({
      where: {
        id,
      },
      data: patientData,
      include: {
        patientHealthData: true,
        medicalReport: true,
      },
    });
    //create or update patientHealthData
    if (patientHealthData) {
      await tsClient.patientHealthData.upsert({
        where: {
          patientId: isExistPatient.id,
        },
        update: patientHealthData,
        create: { ...patientHealthData, patientId: isExistPatient.id },
      });
    }

    if (medicalReport) {
      await tsClient.medicalReport.create({
        data: { ...medicalReport, patientId: isExistPatient.id },
      });
    }
  });

  const response = await prisma.patient.findUnique({
    where: {
      id: isExistPatient.id,
    },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });

  return response;
};

export const patientServices = {
  getAllFromDB,
  updatePatientIntoDB,
  getByIdFromDB,
};
