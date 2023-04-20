/*
  Warnings:

  - The primary key for the `Registration` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_pkey",
ADD CONSTRAINT "Registration_pkey" PRIMARY KEY ("email");
