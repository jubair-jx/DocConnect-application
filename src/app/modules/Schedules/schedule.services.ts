import { Prisma, Schedule } from "@prisma/client";
import { addHours, addMinutes, format } from "date-fns";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { TpaginationItems } from "../../interface/pagination.inteface";
import { TCreateSchedule, TFilterInput } from "./schedule.interface";
const createScheduleIntoDB = async (
  payload: TCreateSchedule
): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;

  const interverlTime = 30;

  const schedules = [];

  const currentDate = new Date(startDate); // start date
  const lastDate = new Date(endDate); // end date

  while (currentDate <= lastDate) {
    // 09:30  ---> ['09', '30']
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, interverlTime),
      };
      const isExitSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!isExitSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + interverlTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
};

const getAllScheduleFromDB = async (
  filters: TFilterInput,
  options: TpaginationItems,
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
          startDateTime: {
            gte: startDate,
          },
        },
        {
          endDateTime: {
            lte: endDate,
          },
        },
      ],
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

  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
  });
  const getIdsWithArr = doctorSchedules.map(
    (doctorSchedule) => doctorSchedule.scheduleId
  );

  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: { notIn: getIdsWithArr },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const totalCount = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: { notIn: getIdsWithArr },
    },
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

export const ScheduleServices = {
  createScheduleIntoDB,
  getAllScheduleFromDB,
};
