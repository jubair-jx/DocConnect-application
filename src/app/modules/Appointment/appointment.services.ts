import { v4 as uuidv4 } from "uuid";
import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interface/common";
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
  const result = await prisma.appointment.create({
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
  return result;
};

export const appointmentServices = {
  createAppointmentIntoDB,
};
