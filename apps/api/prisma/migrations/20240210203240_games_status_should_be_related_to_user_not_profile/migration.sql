/*
  Warnings:

  - You are about to drop the column `profile_id` on the `games_status` table. All the data in the column will be lost.
  - Added the required column `oauth_id` to the `games_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "games_status" DROP CONSTRAINT "games_status_profile_id_fkey";

-- AlterTable
ALTER TABLE "games_status" DROP COLUMN "profile_id",
ADD COLUMN     "oauth_id" TEXT NOT NULL,
ADD COLUMN     "review" TEXT;

-- AddForeignKey
ALTER TABLE "games_status" ADD CONSTRAINT "games_status_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
