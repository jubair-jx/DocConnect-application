import { Doctors, Prisma, UserStatus } from "@prisma/client";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TpaginationItems } from "../../interface/pagination.inteface";
import { doctorSearchableFields } from "./doctor.constant";
import { IDoctorFilterRequest } from "./doctor.inteface";

const updateDoctorInfo = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;

  const isExistDoctor = await prisma.doctors.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (tsClient) => {
    await tsClient.doctors.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });

    if (specialties && specialties.length > 0) {
      const deletedSpecialtieIds = specialties.filter(
        (specialtie) => specialtie.isDeleted
      );
      console.log(deletedSpecialtieIds);
      for (const specialtie of deletedSpecialtieIds) {
        const deleteDoctorSpecialites =
          await tsClient.doctorSpecialties.deleteMany({
            where: {
              doctorId: isExistDoctor.id,
              specialitiesId: specialtie.specialtiesId,
            },
          });
      }
    }

    //create specialties
    const createSpecialtiesInfo = specialties.filter(
      (specialtie) => !specialtie.isDeleted
    );

    for (const specialty of createSpecialtiesInfo) {
      await tsClient.doctorSpecialties.create({
        data: {
          doctorId: isExistDoctor.id,
          specialitiesId: specialty.specialtiesId,
        },
      });
    }
  });
  const result = await prisma.doctors.findUnique({
    where: {
      id: isExistDoctor.id,
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
        : { createdAt: "desc" },
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
