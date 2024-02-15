-- CreateTable
CREATE TABLE "user_activity" (
    "id" SERIAL NOT NULL,
    "oauth_id" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "activityType" "GameStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_activity" ADD CONSTRAINT "user_activity_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_activity" ADD CONSTRAINT "user_activity_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
