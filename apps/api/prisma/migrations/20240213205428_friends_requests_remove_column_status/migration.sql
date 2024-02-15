/*
  Warnings:

  - You are about to drop the column `status` on the `friends_requests_for_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "friends_requests_for_users" DROP COLUMN "status";

-- DropEnum
DROP TYPE "FriendRequestStatus";
