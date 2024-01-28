/*
  Warnings:

  - The primary key for the `game_genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genre_id` on the `game_genre` table. All the data in the column will be lost.
  - The primary key for the `game_platform` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `platform_id` on the `game_platform` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `genres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `platform` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `genre_slug` to the `game_genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_slug` to the `game_platform` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "game_genre" DROP CONSTRAINT "game_genre_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "game_platform" DROP CONSTRAINT "game_platform_platform_id_fkey";

-- AlterTable
ALTER TABLE "game_genre" DROP CONSTRAINT "game_genre_pkey",
DROP COLUMN "genre_id",
ADD COLUMN     "genre_slug" TEXT NOT NULL,
ADD CONSTRAINT "game_genre_pkey" PRIMARY KEY ("game_id", "genre_slug");

-- AlterTable
ALTER TABLE "game_platform" DROP CONSTRAINT "game_platform_pkey",
DROP COLUMN "platform_id",
ADD COLUMN     "platform_slug" TEXT NOT NULL,
ADD CONSTRAINT "game_platform_pkey" PRIMARY KEY ("game_id", "platform_slug");

-- CreateIndex
CREATE UNIQUE INDEX "genres_slug_key" ON "genres"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "platform_slug_key" ON "platform"("slug");

-- AddForeignKey
ALTER TABLE "game_genre" ADD CONSTRAINT "game_genre_genre_slug_fkey" FOREIGN KEY ("genre_slug") REFERENCES "genres"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_platform" ADD CONSTRAINT "game_platform_platform_slug_fkey" FOREIGN KEY ("platform_slug") REFERENCES "platform"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
