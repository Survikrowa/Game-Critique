-- CreateEnum
CREATE TYPE "CollectionStatus" AS ENUM ('ACTIVE', 'REMOVED');

-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "status" "CollectionStatus" NOT NULL DEFAULT 'ACTIVE';
