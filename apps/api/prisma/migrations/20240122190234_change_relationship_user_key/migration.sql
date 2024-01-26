/*
  Warnings:

  - You are about to drop the column `user_id` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[oauth_id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `oauth_id` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropIndex
DROP INDEX "profiles_user_id_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "user_id",
ADD COLUMN     "oauth_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_oauth_id_key" ON "profiles"("oauth_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;
