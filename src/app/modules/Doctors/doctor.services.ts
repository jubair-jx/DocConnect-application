import prisma from "../../../shared/prisma";

const updateDoctorInfo = async (id: string, payload: any) => {
  const isExistUser = await prisma.doctors.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const updateInfo = await prisma.doctors.update({
    where: {
      id,
    },
    data: payload,
  });

  return updateInfo;
};

export const doctorServices = {
  updateDoctorInfo,
};
