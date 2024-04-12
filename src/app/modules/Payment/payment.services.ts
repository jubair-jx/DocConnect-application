import prisma from "../../../shared/prisma";
import { sslServices } from "../SSL/ssl.services";
const createPaymentIntoDB = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const paymentInfo = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    phoneNumber: paymentData.appointment.patient.contactNumber,
  };
  const result = await sslServices.initPayment(paymentInfo);

  return {
    paymetUrl: result.GatewayPageURL,
  };
};

export const paymentServices = {
  createPaymentIntoDB,
};
