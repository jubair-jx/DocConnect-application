import { PaymentStatus } from "@prisma/client";
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

const validatedPaymentIntoDB = async (payload: any) => {
  if (!payload || !payload.status || !(payload.status === "VALID")) {
    return {
      message: "Invalid payment",
    };
  }
  const response = await sslServices.validatePayment(payload);
  if (response?.status !== "VALID") {
    return {
      message: "Payment Failed",
    };
  }

  // const response = payload;

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });
};

export const paymentServices = {
  createPaymentIntoDB,
  validatedPaymentIntoDB,
};
