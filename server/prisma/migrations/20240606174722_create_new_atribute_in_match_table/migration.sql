/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "isPrivate",
ADD COLUMN     "isFull" BOOLEAN NOT NULL DEFAULT false;
