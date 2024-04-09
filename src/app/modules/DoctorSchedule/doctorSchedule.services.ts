import prisma from "../../../shared/prisma";

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

export const DoctorsSchedulesService = {
  createDoctorScheduleIntoDB,
};
