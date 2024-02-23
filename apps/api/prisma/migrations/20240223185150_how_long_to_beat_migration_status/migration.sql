-- CreateEnum
CREATE TYPE "MigrationStatus" AS ENUM ('WAITING', 'IN_PROGRESS', 'FINISHED', 'FAILED');

-- CreateTable
CREATE TABLE "how_long_to_beat_account_migration_status" (
    "id" SERIAL NOT NULL,
    "oauth_id" TEXT NOT NULL,
    "status" "MigrationStatus" NOT NULL DEFAULT 'WAITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "how_long_to_beat_account_migration_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "how_long_to_beat_account_migration_status_oauth_id_key" ON "how_long_to_beat_account_migration_status"("oauth_id");

-- AddForeignKey
ALTER TABLE "how_long_to_beat_account_migration_status" ADD CONSTRAINT "how_long_to_beat_account_migration_status_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
