/*
  Warnings:

  - You are about to drop the column `igdb_id` on the `release` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `release` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "release_igdb_id_key";

-- AlterTable
ALTER TABLE "release" DROP COLUMN "igdb_id",
DROP COLUMN "name";
