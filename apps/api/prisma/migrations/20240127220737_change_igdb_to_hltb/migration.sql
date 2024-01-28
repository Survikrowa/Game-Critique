/*
  Warnings:

  - You are about to drop the column `igdb_id` on the `cover` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `cover` table. All the data in the column will be lost.
  - You are about to drop the column `igdb_id` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `parent_game_id` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `igdb_id` on the `genres` table. All the data in the column will be lost.
  - You are about to drop the column `igdb_id` on the `platform` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hltb_id]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bigUrl` to the `cover` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediumUrl` to the `cover` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smallUrl` to the `cover` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hltb_id` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cover_igdb_id_key";

-- DropIndex
DROP INDEX "games_igdb_id_key";

-- DropIndex
DROP INDEX "genres_igdb_id_key";

-- DropIndex
DROP INDEX "platform_igdb_id_key";

-- AlterTable
ALTER TABLE "cover" DROP COLUMN "igdb_id",
DROP COLUMN "url",
ADD COLUMN     "bigUrl" TEXT NOT NULL,
ADD COLUMN     "mediumUrl" TEXT NOT NULL,
ADD COLUMN     "smallUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "games" DROP COLUMN "igdb_id",
DROP COLUMN "parent_game_id",
ADD COLUMN     "hltb_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "genres" DROP COLUMN "igdb_id";

-- AlterTable
ALTER TABLE "platform" DROP COLUMN "igdb_id";

-- CreateIndex
CREATE UNIQUE INDEX "games_hltb_id_key" ON "games"("hltb_id");
