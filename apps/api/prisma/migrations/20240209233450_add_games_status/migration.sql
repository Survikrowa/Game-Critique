-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('COMPLETED', 'RETIRED', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "games_status" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "score" TEXT,
    "platform_slug" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "game_id" INTEGER NOT NULL,
    "achievements_completed" BOOLEAN NOT NULL,

    CONSTRAINT "games_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games_status_completion" (
    "id" SERIAL NOT NULL,
    "hours" INTEGER NOT NULL,
    "minutes" INTEGER NOT NULL,
    "seconds" INTEGER NOT NULL,
    "games_status_id" INTEGER NOT NULL,

    CONSTRAINT "games_status_completion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_status_completion_games_status_id_key" ON "games_status_completion"("games_status_id");

-- AddForeignKey
ALTER TABLE "games_status" ADD CONSTRAINT "games_status_platform_slug_fkey" FOREIGN KEY ("platform_slug") REFERENCES "platform"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_status" ADD CONSTRAINT "games_status_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_status_completion" ADD CONSTRAINT "games_status_completion_games_status_id_fkey" FOREIGN KEY ("games_status_id") REFERENCES "games_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
