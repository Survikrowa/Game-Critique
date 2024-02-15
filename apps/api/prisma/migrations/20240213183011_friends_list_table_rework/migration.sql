/*
  Warnings:

  - You are about to drop the `friends_list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "friends_list" DROP CONSTRAINT "friends_list_friend_id_fkey";

-- DropForeignKey
ALTER TABLE "friends_list" DROP CONSTRAINT "friends_list_owner_id_fkey";

-- DropTable
DROP TABLE "friends_list";

-- CreateTable
CREATE TABLE "FriendsList" (
    "id" SERIAL NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendsList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends_list_for_friends" (
    "friends_list_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friends_list_for_friends_pkey" PRIMARY KEY ("friends_list_id","friend_id")
);

-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "friend_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendsList_owner_id_key" ON "FriendsList"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "friends_friend_id_key" ON "friends"("friend_id");

-- AddForeignKey
ALTER TABLE "FriendsList" ADD CONSTRAINT "FriendsList_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_list_for_friends" ADD CONSTRAINT "friends_list_for_friends_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "friends"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_list_for_friends" ADD CONSTRAINT "friends_list_for_friends_friends_list_id_fkey" FOREIGN KEY ("friends_list_id") REFERENCES "FriendsList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
