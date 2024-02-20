-- CreateTable
CREATE TABLE "game_completion_time" (
    "id" SERIAL NOT NULL,
    "main" INTEGER NOT NULL,
    "mainExtra" INTEGER NOT NULL,
    "completionist" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "game_completion_time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_completion_time_game_id_key" ON "game_completion_time"("game_id");

-- AddForeignKey
ALTER TABLE "game_completion_time" ADD CONSTRAINT "game_completion_time_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
