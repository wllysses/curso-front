/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'STUDENT';
