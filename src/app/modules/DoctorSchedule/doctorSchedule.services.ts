import { Prisma } from "@prisma/client";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";

const createDoctorScheduleIntoDB = async (
  user: any,
  payload: {
    scheduleIds: string[];
  }
) => {
  console.log(user);
  const isExistDoctor = await prisma.doctors.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorSchedule = payload.scheduleIds.map((scheduleId) => ({
    doctorId: isExistDoctor.id,
    scheduleId,
  }));
  const result = await prisma.doctorSchedule.createMany({
    data: doctorSchedule,
  });
  return result;
};

const getAllDoctorScheduleFromDB = async (
  filters: any,
  options: any,
  user: TAuthUser
) => {
  const { limit, page, skip } =
    helperFunction.calculatePaginationFiltering(options);
  const { startDate, endDate, ...filterData } = filters;

  const andConditions = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: startDate,
            },
          },
        },
        {
          schedule: {
            endDateTime: {
              lte: endDate,
            },
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "true"
    ) {
      filterData.isBooked = true;
    } else if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "false"
    ) {
      filterData.isBooked = false;
    }
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

  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
  });
  // const getIdsWithArr = doctorSchedules.map(
  //   (doctorSchedule) => doctorSchedule.scheduleId
  // );

  const whereConditions: Prisma.DoctorScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctorSchedule.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  const totalCount = await prisma.doctorSchedule.count({
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

export const DoctorsSchedulesService = {
  createDoctorScheduleIntoDB,
  getAllDoctorScheduleFromDB,
};
