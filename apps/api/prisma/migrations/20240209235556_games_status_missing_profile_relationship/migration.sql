-- AddForeignKey
ALTER TABLE "games_status" ADD CONSTRAINT "games_status_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
