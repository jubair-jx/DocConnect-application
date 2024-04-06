-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctore-schedules" (
    "doctorId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL,
    "appointmentId" TEXT,

    CONSTRAINT "doctore-schedules_pkey" PRIMARY KEY ("doctorId","scheduleId")
);

-- AddForeignKey
ALTER TABLE "doctore-schedules" ADD CONSTRAINT "doctore-schedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctore-schedules" ADD CONSTRAINT "doctore-schedules_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
