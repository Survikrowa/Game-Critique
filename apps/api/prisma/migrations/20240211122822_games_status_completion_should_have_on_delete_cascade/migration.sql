-- DropForeignKey
ALTER TABLE "games_status_completion" DROP CONSTRAINT "games_status_completion_games_status_id_fkey";

-- AddForeignKey
ALTER TABLE "games_status_completion" ADD CONSTRAINT "games_status_completion_games_status_id_fkey" FOREIGN KEY ("games_status_id") REFERENCES "games_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
