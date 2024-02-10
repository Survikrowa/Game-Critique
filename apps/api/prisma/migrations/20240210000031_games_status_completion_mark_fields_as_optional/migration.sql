-- AlterTable
ALTER TABLE "games_status_completion" ALTER COLUMN "hours" DROP NOT NULL,
ALTER COLUMN "minutes" DROP NOT NULL,
ALTER COLUMN "seconds" DROP NOT NULL;
