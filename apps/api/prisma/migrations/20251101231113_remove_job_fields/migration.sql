/*
  Warnings:

  - You are about to drop the column `platform` on the `does_it_play_scraping_jobs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `does_it_play_scraping_jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "does_it_play_scraping_jobs" DROP COLUMN "platform",
DROP COLUMN "title";
