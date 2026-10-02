-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('BEAT_GAME', 'IN_GAME_CHALLENGE');

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'FORFEITED');

-- CreateEnum
CREATE TYPE "ChallengeGroupMemberRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "ChallengeGroupMemberStatus" AS ENUM ('INVITED', 'ACTIVE');

-- CreateTable
CREATE TABLE "challenge_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_group_member" (
    "group_id" INTEGER NOT NULL,
    "oauth_id" TEXT NOT NULL,
    "role" "ChallengeGroupMemberRole" NOT NULL DEFAULT 'MEMBER',
    "status" "ChallengeGroupMemberStatus" NOT NULL DEFAULT 'INVITED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_group_member_pkey" PRIMARY KEY ("group_id","oauth_id")
);

-- CreateTable
CREATE TABLE "challenge" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "challenger_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "type" "ChallengeType" NOT NULL DEFAULT 'BEAT_GAME',
    "status" "ChallengeStatus" NOT NULL DEFAULT 'PENDING',
    "game_id" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),
    "forfeited_at" TIMESTAMP(3),

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "challenge_group_id_status_idx" ON "challenge"("group_id", "status");

-- AddForeignKey
ALTER TABLE "challenge_group" ADD CONSTRAINT "challenge_group_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_group_member" ADD CONSTRAINT "challenge_group_member_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "challenge_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_group_member" ADD CONSTRAINT "challenge_group_member_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "challenge_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_challenger_id_fkey" FOREIGN KEY ("challenger_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("oauth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
