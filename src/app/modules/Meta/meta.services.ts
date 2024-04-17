import { UserRole } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";

const getAllMetaDataBasedOnRole = async (user: TAuthUser) => {
  switch (user?.role) {
    case UserRole.SUPER_ADMIN:
      getSuperAdminMetaData();
      break;
    case UserRole.ADMIN:
      getAdminMetaData();
      break;
    case UserRole.DOCTOR:
      getDoctorMetaData(user);
      break;
    case UserRole.PATIENT:
      getPatientMetaData();
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid role");
  }
};

const getSuperAdminMetaData = async () => {};
const getAdminMetaData = async () => {
  const doctors = await prisma.doctors.count();
  const patients = await prisma.patient.count();
  const appointments = await prisma.appointment.count();
};
const getDoctorMetaData = async (user: TAuthUser) => {
  const doctorData = await prisma.doctors.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const appointmentCount = await prisma.appointment.count({
    where: {
      doctorId: doctorData.id,
    },
  });
  const patientCount = await prisma.appointment.groupBy({
    by: ["patientId"],
    _count: {
      id: true,
    },
  });
  const reviewCount = await prisma.review.count({
    where: {
      doctorId: doctorData.id,
    },
  });
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      appointment: {
        doctorId: doctorData.id,
      },
    },
  });

  const appointmentDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
    where: {
      doctorId: doctorData.id,
    },
  });
  const formattedStatusMapped = appointmentDistribution.map(
    ({ status, _count }) => ({
      status,
      count: Number(_count.id),
    })
  );

  console.log(formattedStatusMapped, { depth: "infinity" });
};
const getPatientMetaData = async () => {};

export const MetaServices = {
  getAllMetaDataBasedOnRole,
};
