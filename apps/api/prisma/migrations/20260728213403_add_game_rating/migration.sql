-- CreateTable
CREATE TABLE "game_rating" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "igdb_id" INTEGER NOT NULL,
    "aggregated_rating" DOUBLE PRECISION,
    "aggregated_rating_count" INTEGER,
    "igdb_rating" DOUBLE PRECISION,
    "igdb_rating_count" INTEGER,
    "igdb_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_rating_game_id_key" ON "game_rating"("game_id");

-- AddForeignKey
ALTER TABLE "game_rating" ADD CONSTRAINT "game_rating_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
