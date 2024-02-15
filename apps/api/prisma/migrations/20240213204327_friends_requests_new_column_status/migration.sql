/*
  Warnings:

  - Added the required column `status` to the `friends_requests_for_users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FriendRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'NEUTRAL');

-- AlterTable
ALTER TABLE "friends_requests_for_users" ADD COLUMN     "status" "FriendRequestStatus" NOT NULL;
