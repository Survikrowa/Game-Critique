-- CreateEnum
CREATE TYPE "GameDataSource" AS ENUM ('HLTB', 'IGDB');

-- CreateTable
CREATE TABLE "game_source_id" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "source" "GameDataSource" NOT NULL,
    "external_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_source_id_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_source_id_game_id_source_key" ON "game_source_id"("game_id", "source");

-- CreateIndex
CREATE UNIQUE INDEX "game_source_id_source_external_id_key" ON "game_source_id"("source", "external_id");

-- AddForeignKey
ALTER TABLE "game_source_id" ADD CONSTRAINT "game_source_id_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
