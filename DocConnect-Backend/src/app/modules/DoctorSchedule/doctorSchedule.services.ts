import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { TpaginationItems } from "../../interface/pagination.inteface";
import { IDoctorScheduleFilterRequest } from "./doctorSchedule.interface";

const createDoctorScheduleIntoDB = async (
  user: TAuthUser,
  payload: {
    scheduleIds: string[];
  }
) => {
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

const getAllMyScheduleFromDB = async (
  filters: any,
  options: any,
  user: TAuthUser
) => {
  const { limit, page, skip } =
    helperFunction.calculatePaginationFiltering(options);
  const { startDate, endDate, ...filterData } = filters;
  console.log({ startDate, endDate });

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

  const whereConditions: Prisma.DoctorScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctorSchedule.findMany({
    include: {
      schedule: true,
      doctor: true,
      appointment: true,
    },
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

//TODO: Due Issues
const deleteFromDB = async (user: TAuthUser, scheduleId: string) => {
  const doctorData = await prisma.doctors.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const isBookedSchedule = await prisma.doctorSchedule.findFirst({
    where: {
      doctorId: doctorData.id,
      scheduleId: scheduleId,
      isBooked: true,
    },
  });

  if (isBookedSchedule) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You can not delete the schedule because of the schedule is already booked!"
    );
  }

  const result = await prisma.doctorSchedule.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorData.id,
        scheduleId: scheduleId,
      },
    },
  });
  return result;
};
const getAllFromDB = async (
  filters: IDoctorScheduleFilterRequest,
  options: TpaginationItems
) => {
  const { limit, page, skip } =
    helperFunction.calculatePaginationFiltering(options);
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  console.log(filterData);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      doctor: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
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
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: startDate,
          },
        },
        {
          schedule: {
            endDateTime: endDate,
          },
        },
      ],
    });
  }

  const whereConditions: any =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.doctorSchedule.findMany({
    include: {
      doctor: true,
      schedule: true,
    },
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
  getAllMyScheduleFromDB,
  deleteFromDB,
  getAllFromDB,
};
