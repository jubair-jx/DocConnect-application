import { Router } from "express";
import adminRoutes from "../app/modules/Admin/admin.route";
import appointmentRoutes from "../app/modules/Appointment/appointmet.routes";
import AuthRoutes from "../app/modules/Auth/auth.routes";
import doctorScheduleRoutes from "../app/modules/DoctorSchedule/doctorSchedule.route";
import doctorRoutes from "../app/modules/Doctors/doctor.route";
import patientRoutes from "../app/modules/Patient/patient.route";
import paymentRoutes from "../app/modules/Payment/payment.routes";
import prescriptionRoutes from "../app/modules/Prescription/prescription.routes";
import reviewRoutes from "../app/modules/Review/review.routes";
import scheduleRoutes from "../app/modules/Schedules/schedule.routes";
import specialitesRoutes from "../app/modules/Specialties/specialties.route";
import userRoutes from "../app/modules/Users/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialites",
    route: specialitesRoutes,
  },
  {
    path: "/doctor",
    route: doctorRoutes,
  },
  {
    path: "/patient",
    route: patientRoutes,
  },
  {
    path: "/schedule",
    route: scheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: doctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: appointmentRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/prescription",
    route: prescriptionRoutes,
  },
  {
    path: "/review",
    route: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
