-- CreateEnum
CREATE TYPE "DoesItPlayJobStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "push_tokens" (
    "id" SERIAL NOT NULL,
    "oauth_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "push_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_preferences" (
    "oauth_id" TEXT NOT NULL,
    "friend_activity" BOOLEAN NOT NULL DEFAULT true,
    "friend_invites" BOOLEAN NOT NULL DEFAULT true,
    "weekly_summary" BOOLEAN NOT NULL DEFAULT true,
    "release_reminders" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("oauth_id")
);

-- CreateTable
CREATE TABLE "does_it_play_scraping_jobs" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "status" "DoesItPlayJobStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "does_it_play_scraping_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_metadata" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "game_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games_physical_media" (
    "id" SERIAL NOT NULL,
    "platform" TEXT,
    "has_physical_release" BOOLEAN NOT NULL,
    "has_game_on_disc" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "game_metadata_id" INTEGER NOT NULL,

    CONSTRAINT "games_physical_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "push_tokens_token_key" ON "push_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "does_it_play_scraping_jobs_url_key" ON "does_it_play_scraping_jobs"("url");

-- CreateIndex
CREATE UNIQUE INDEX "does_it_play_scraping_jobs_job_id_key" ON "does_it_play_scraping_jobs"("job_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_metadata_game_id_key" ON "game_metadata"("game_id");

-- AddForeignKey
ALTER TABLE "push_tokens" ADD CONSTRAINT "push_tokens_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_preferences" ADD CONSTRAINT "notification_preferences_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_metadata" ADD CONSTRAINT "game_metadata_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_physical_media" ADD CONSTRAINT "games_physical_media_game_metadata_id_fkey" FOREIGN KEY ("game_metadata_id") REFERENCES "game_metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
