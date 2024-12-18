/*
  Warnings:

  - You are about to drop the column `role` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "role",
ADD COLUMN     "name" "RoleEnum" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
