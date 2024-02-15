-- CreateTable
CREATE TABLE "friends_list" (
    "id" SERIAL NOT NULL,
    "owner_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friends_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friends_list_owner_id_key" ON "friends_list"("owner_id");

-- AddForeignKey
ALTER TABLE "friends_list" ADD CONSTRAINT "friends_list_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_list" ADD CONSTRAINT "friends_list_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
