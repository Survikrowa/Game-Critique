import { RepositoryPort } from '../../../../libs/ddd/repository.port';
import { Challenge } from '../models/challenge.model';
import { ChallengeStatus } from '@prisma/client';

export const CHALLENGE_REPOSITORY = Symbol('CHALLENGE_REPOSITORY');

export type ChallengeWithRelations = Challenge & {
  gameName?: string | null;
  gameCover?: string | null;
  challengerName?: string | null;
  recipientName?: string | null;
};

export interface ChallengeRepositoryPort extends RepositoryPort<Challenge> {
  findById(id: number): Promise<Challenge | null>;
  findByGroup(
    groupId: number,
    status?: ChallengeStatus,
  ): Promise<ChallengeWithRelations[]>;
  findActiveForRecipient(oauthId: string, gameId: number): Promise<Challenge[]>;
  updateStatus(id: number, status: ChallengeStatus): Promise<Challenge>;
  markCompleted(id: number, completedAt: Date): Promise<Challenge>;
  markForfeited(id: number, forfeitedAt: Date): Promise<Challenge>;
  delete(id: number): Promise<void>;
  completeCountFor(oauthId: string): Promise<number>;
  forfeitCountFor(oauthId: string): Promise<number>;
}
