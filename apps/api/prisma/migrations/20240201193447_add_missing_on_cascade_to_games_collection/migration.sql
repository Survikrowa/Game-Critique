-- DropForeignKey
ALTER TABLE "game_collection" DROP CONSTRAINT "game_collection_collection_id_fkey";

-- AddForeignKey
ALTER TABLE "game_collection" ADD CONSTRAINT "game_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
