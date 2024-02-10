/*
  Warnings:

  - You are about to drop the column `platform_slug` on the `games_status` table. All the data in the column will be lost.
  - Added the required column `platform_id` to the `games_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "games_status" DROP CONSTRAINT "games_status_platform_slug_fkey";

-- AlterTable
ALTER TABLE "games_status" DROP COLUMN "platform_slug",
ADD COLUMN     "platform_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "games_status" ADD CONSTRAINT "games_status_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
