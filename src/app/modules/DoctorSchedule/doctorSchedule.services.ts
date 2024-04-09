import prisma from "../../../shared/prisma";

const createDoctorScheduleIntoDB = async (
  user: any,
  payload: {
    scheduleIds: string[];
  }
) => {
  console.log(user);
  const isExistDoctor = await prisma.doctors.findUnique({
    where: {
      email: user.email,
    },
  });

  console.log(payload);
};

export const DoctorsSchedulesService = {
  createDoctorScheduleIntoDB,
};
