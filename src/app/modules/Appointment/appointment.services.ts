import { AppointmentStatus, Prisma, UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../../../errors/ApiError";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { TpaginationItems } from "../../interface/pagination.inteface";
const createAppointmentIntoDB = async (user: TAuthUser, payload: any) => {
  const isPatientExist = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isExistDoctor = await prisma.doctors.findFirstOrThrow({
    where: {
      id: payload.doctorId,
    },
  });
  const isDoctorScheduleExist = await prisma.doctorSchedule.findFirstOrThrow({
    where: {
      scheduleId: payload.scheduleId,
      doctorId: payload.doctorId,
      isBooked: false,
    },
  });

  const videoCallingId = uuidv4();
  const result = await prisma.$transaction(async (tx) => {
    const appointmentData = await tx.appointment.create({
      data: {
        patientId: isPatientExist.id,
        doctorId: payload.doctorId,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
      include: {
        patient: true,
        schedule: true,
        doctor: true,
      },
    });
    await tx.doctorSchedule.update({
      where: {
        doctorId_scheduleId: {
          doctorId: isExistDoctor.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });
    const date = new Date();
    const transactionId =
      "DocConnect" +
      "-" +
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getHours();

    await tx.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: isExistDoctor.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });
  return result;
};

const getMyAppointmentFromDB = async (
  user: TAuthUser,
  filters: any,
  options: TpaginationItems
) => {
  const { limit, page, skip } =
    helperFunction.calculatePaginationFiltering(options);
  const { ...filterData } = filters;

  const andConditions: Prisma.AppointmentWhereInput[] = [];

  // doctor > doctorSpecialties > specialties -> title
  if (user?.role === UserRole.PATIENT) {
    andConditions.push({
      patient: {
        email: user?.email,
      },
    });
  } else if (user?.role === UserRole.DOCTOR) {
    andConditions.push({
      doctor: {
        email: user?.email,
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

  const whereConditions: Prisma.AppointmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.appointment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include:
      user?.role === UserRole.PATIENT
        ? { doctor: true, schedule: true }
        : {
            patient: {
              include: { medicalReport: true, patientHealthData: true },
            },
            schedule: true,
          },
  });

  const totalCount = await prisma.appointment.count({
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

const updateAppointmentStatusIntoDB = async (
  id: string,
  status: AppointmentStatus,
  user: TAuthUser
) => {
  const isAppointmentExist = await prisma.appointment.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      doctor: true,
    },
  });
  if (user?.role === UserRole.DOCTOR) {
    if (!(user?.email === isAppointmentExist.doctor.email)) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "This is not your appointment boss!!!"
      );
    }
  }

  const result = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return result;
};

export const appointmentServices = {
  createAppointmentIntoDB,
  getMyAppointmentFromDB,
  updateAppointmentStatusIntoDB,
};
