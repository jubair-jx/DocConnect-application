/*
  Warnings:

  - The `avagereRating` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "avagereRating",
ADD COLUMN     "avagereRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
