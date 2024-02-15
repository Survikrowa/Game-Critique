-- CreateTable
CREATE TABLE "friends_requests_for_users" (
    "owner_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friends_requests_for_users_pkey" PRIMARY KEY ("owner_id","receiver_id")
);

-- AddForeignKey
ALTER TABLE "friends_requests_for_users" ADD CONSTRAINT "friends_requests_for_users_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_requests_for_users" ADD CONSTRAINT "friends_requests_for_users_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
