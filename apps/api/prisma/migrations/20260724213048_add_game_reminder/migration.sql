-- CreateTable
CREATE TABLE "game_reminder" (
    "id" SERIAL NOT NULL,
    "oauth_id" TEXT NOT NULL,
    "igdb_id" INTEGER NOT NULL,
    "game_name" TEXT NOT NULL,
    "game_url" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "cover_url" TEXT,
    "notified_one_week" BOOLEAN NOT NULL DEFAULT false,
    "notified_release_day" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_reminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_reminder_oauth_id_igdb_id_key" ON "game_reminder"("oauth_id", "igdb_id");

-- AddForeignKey
ALTER TABLE "game_reminder" ADD CONSTRAINT "game_reminder_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
