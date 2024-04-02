import prisma from "../../../shared/prisma";

const updateDoctorInfo = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;

  const isExistDoctor = await prisma.doctors.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (tsClient) => {
    const updateDoctorInfo = await tsClient.doctors.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });

    for (const specialtiesId of specialties) {
      const createDoctorSpecialites = await tsClient.doctorSpecialties.create({
        data: {
          doctorId: isExistDoctor.id,
          specialitiesId: specialtiesId,
        },
      });
    }

    return updateDoctorInfo;
  });

  return result;
};

export const doctorServices = {
  updateDoctorInfo,
};
