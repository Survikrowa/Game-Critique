-- CreateEnum
CREATE TYPE "DoesItPlayJobStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "does_it_play_scraping_jobs" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "status" "DoesItPlayJobStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "does_it_play_scraping_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "does_it_play_scraping_jobs_url_key" ON "does_it_play_scraping_jobs"("url");

-- CreateIndex
CREATE UNIQUE INDEX "does_it_play_scraping_jobs_job_id_key" ON "does_it_play_scraping_jobs"("job_id");
