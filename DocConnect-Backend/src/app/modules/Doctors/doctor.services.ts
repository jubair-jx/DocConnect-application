import { Doctors, Prisma, UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utlis";
import { TpaginationItems } from "../../interface/pagination.inteface";
import { doctorSearchableFields } from "./doctor.constant";
import { IDoctorFilterRequest, ISpecialties } from "./doctor.inteface";

const updateDoctorInfo = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;
  await prisma.$transaction(async (transactionClient) => {
    const result = await transactionClient.doctors.update({
      where: {
        id,
      },
      data: doctorData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Unable to update Doctor");
    }
    if (specialties && specialties.length > 0) {
      const deleteSpecialties = specialties.filter(
        (specialty) => specialty.specialtiesId && specialty.isDeleted
      );

      const newSpecialties = specialties.filter(
        (specialty) => specialty.specialtiesId && !specialty.isDeleted
      );

      await asyncForEach(
        deleteSpecialties,
        async (deleteDoctorSpeciality: ISpecialties) => {
          await transactionClient.doctorSpecialties.deleteMany({
            where: {
              AND: [
                {
                  doctorId: id,
                },
                {
                  specialitiesId: deleteDoctorSpeciality.specialtiesId,
                },
              ],
            },
          });
        }
      );
      await asyncForEach(
        newSpecialties,
        async (insertDoctorSpecialty: ISpecialties) => {
          //@ needed for already added specialties
          const existingSpecialties = await prisma.doctorSpecialties.findFirst({
            where: {
              specialitiesId: insertDoctorSpecialty.specialtiesId,
              doctorId: id,
            },
          });

          if (!existingSpecialties) {
            await transactionClient.doctorSpecialties.create({
              data: {
                doctorId: id,
                specialitiesId: insertDoctorSpecialty.specialtiesId,
              },
            });
          }
        }
      );
    }

    return result;
  });

  const responseData = await prisma.doctors.findUnique({
    where: {
      id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });
  return responseData;
};

const getAllFromDB = async (
  filters: IDoctorFilterRequest,
  options: TpaginationItems
) => {
  const { limit, page, skip } =
    helperFunction.calculatePaginationFiltering(options);
  const { searchTerm, specialties, ...filterData } = filters;

  const andConditions: Prisma.DoctorsWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // doctor > doctorSpecialties > specialties -> title

  if (specialties && specialties.length > 0) {
    andConditions.push({
      doctorSpecialties: {
        some: {
          specialties: {
            title: {
              contains: specialties,
              mode: "insensitive",
            },
          },
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push(...filterConditions);
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.DoctorsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctors.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { avagereRating: "desc" },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  const totalCount = await prisma.doctors.count({
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

const getByIdFromDB = async (id: string): Promise<Doctors | null> => {
  const result = await prisma.doctors.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Doctors> => {
  return await prisma.$transaction(async (transactionClient) => {
    const deleteDoctor = await transactionClient.doctors.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: deleteDoctor.email,
      },
    });

    return deleteDoctor;
  });
};

const softDelete = async (id: string): Promise<Doctors> => {
  return await prisma.$transaction(async (transactionClient) => {
    const deleteDoctor = await transactionClient.doctors.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: deleteDoctor.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deleteDoctor;
  });
};

export const doctorServices = {
  updateDoctorInfo,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
  softDelete,
};
