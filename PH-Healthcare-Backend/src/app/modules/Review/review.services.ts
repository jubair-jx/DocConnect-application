import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";

const createReviewIntoDB = async (user: TAuthUser, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
  });
  if (!(patientData.id === appointmentData.patientId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This is not your appointment Bro!!!"
    );
  }
  return await prisma.$transaction(async (tx) => {
    const result = await tx.review.create({
      data: {
        patientId: patientData.id,
        doctorId: appointmentData.doctorId,
        appointmentId: payload.appointmentId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });
    const avgRating = await tx.review.aggregate({
      _avg: {
        rating: true,
      },
    });
    await tx.doctors.update({
      where: {
        id: appointmentData.doctorId,
      },
      data: {
        avagereRating: avgRating._avg.rating as number,
      },
    });
    return result;
  });
};

export const ReviewServices = {
  createReviewIntoDB,
};
