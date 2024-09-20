/*
  Warnings:

  - You are about to drop the column `owner` on the `Match` table. All the data in the column will be lost.
  - Added the required column `isOwner` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "owner";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOwner" BOOLEAN NOT NULL;
