/*
  Warnings:

  - You are about to drop the column `slug` on the `release` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "release" DROP COLUMN "slug",
ADD COLUMN     "date" INTEGER;
