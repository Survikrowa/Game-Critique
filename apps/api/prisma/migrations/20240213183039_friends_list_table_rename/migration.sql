/*
  Warnings:

  - You are about to drop the `FriendsList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FriendsList" DROP CONSTRAINT "FriendsList_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "friends_list_for_friends" DROP CONSTRAINT "friends_list_for_friends_friends_list_id_fkey";

-- DropTable
DROP TABLE "FriendsList";

-- CreateTable
CREATE TABLE "friends_list" (
    "id" SERIAL NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friends_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_list_owner_id_key" ON "friends_list"("owner_id");

-- AddForeignKey
ALTER TABLE "friends_list" ADD CONSTRAINT "friends_list_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_list_for_friends" ADD CONSTRAINT "friends_list_for_friends_friends_list_id_fkey" FOREIGN KEY ("friends_list_id") REFERENCES "friends_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
