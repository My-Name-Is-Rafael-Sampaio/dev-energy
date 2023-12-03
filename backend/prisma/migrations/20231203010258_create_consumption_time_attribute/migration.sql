/*
  Warnings:

  - Added the required column `consumptionTime` to the `electronic_devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "electronic_devices" ADD COLUMN     "consumptionTime" INTEGER NOT NULL;
