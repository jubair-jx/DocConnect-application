import { AppointmentStatus, PaymentStatus, Prescription } from "@prisma/client";
import { helperFunction } from "../../../helpers/helper.paginationFilter";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
import { TpaginationItems } from "../../interface/pagination.inteface";

const prescriptionCreatingIntoDB = async (
  user: TAuthUser,
  payload: Partial<Prescription>
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      paymentStatus: PaymentStatus.PAID,
      status: AppointmentStatus.COMPLETED,
    },
    include: {
      doctor: true,
      patient: true,
    },
  });
  const result = await prisma.prescription.create({
    data: {
      appointmentId: appointmentData.id,
      doctorId: appointmentData.doctor.id,
      patientId: appointmentData.patient.id,
      instructions: payload.instructions as string,
      followUpDate: payload.followUpDate || null || undefined,
    },
    include: {
      patient: true,
    },
  });
  return result;
};

const getMyPrescriptionAsPatientFromDB = async (
  user: TAuthUser,
  options: TpaginationItems
) => {
  const isPatientForPrecription = await prisma.prescription.findFirstOrThrow({
    where: {
      patient: {
        email: user?.email,
      },
    },
  });
  const { limit, page, skip } =
    helperFunction.calculatePaginationFiltering(options);
  const result = await prisma.prescription.findMany({
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      doctor: true,
      patient: true,
      appointment: true,
    },
  });

  const totalCount = await prisma.prescription.count({
    where: {
      patient: {
        email: user?.email,
      },
    },
  });
  return {
    meta: {
      totalCount,
      limit,
      page,
    },
    data: result,
  };
};

export const PrescriptionServices = {
  prescriptionCreatingIntoDB,
  getMyPrescriptionAsPatientFromDB,
};
