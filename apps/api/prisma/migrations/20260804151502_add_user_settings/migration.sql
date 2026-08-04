-- CreateTable
CREATE TABLE "user_settings" (
    "oauth_id" TEXT NOT NULL,
    "platform_ids" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("oauth_id")
);

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
