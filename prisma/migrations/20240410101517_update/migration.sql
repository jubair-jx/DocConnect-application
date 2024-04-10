/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `doctore-schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctore-schedules_appointmentId_key" ON "doctore-schedules"("appointmentId");

-- AddForeignKey
ALTER TABLE "doctore-schedules" ADD CONSTRAINT "doctore-schedules_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
