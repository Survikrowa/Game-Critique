/*
  Warnings:

  - A unique constraint covering the columns `[profile_id]` on the table `collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "collection_profile_id_key" ON "collection"("profile_id");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
