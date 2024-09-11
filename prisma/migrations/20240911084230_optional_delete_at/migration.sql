/*
  Warnings:

  - Added the required column `status` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "status" TEXT NOT NULL;
