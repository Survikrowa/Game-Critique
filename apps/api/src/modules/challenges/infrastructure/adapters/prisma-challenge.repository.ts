import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
  ChallengeRepositoryPort,
  ChallengeWithRelations,
} from '../../domain/ports/challenge.repository.port';
import { Challenge } from '../../domain/models/challenge.model';
import { ChallengeStatus } from '@prisma/client';

@Injectable()
export class PrismaChallengeRepository implements ChallengeRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(challenge: Challenge): Promise<Challenge> {
    const saved = await this.prisma.challenge.create({
      data: {
        groupId: challenge.groupId,
        challengerId: challenge.challengerId,
        recipientId: challenge.recipientId,
        type: challenge.type,
        status: challenge.status,
        gameId: challenge.gameId,
        description: challenge.description,
      },
    });
    return this.toModel(saved);
  }

  async findById(id: number): Promise<Challenge | null> {
    const record = await this.prisma.challenge.findUnique({ where: { id } });
    return record ? this.toModel(record) : null;
  }

  async findByGroup(
    groupId: number,
    status?: ChallengeStatus,
  ): Promise<ChallengeWithRelations[]> {
    const records = await this.prisma.challenge.findMany({
      where: { groupId, ...(status ? { status } : {}) },
      include: {
        game: { include: { cover: true } },
        challenger: { include: { profile: true } },
        recipient: { include: { profile: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return records.map((r) =>
      Object.assign(this.toModel(r), {
        gameName: r.game?.name ?? null,
        gameCover: r.game?.cover?.smallUrl ?? null,
        challengerName: r.challenger?.profile?.name ?? null,
        recipientName: r.recipient?.profile?.name ?? null,
      }),
    );
  }

  async findActiveForRecipient(
    oauthId: string,
    gameId: number,
  ): Promise<Challenge[]> {
    const records = await this.prisma.challenge.findMany({
      where: { recipientId: oauthId, gameId, status: ChallengeStatus.ACTIVE },
    });
    return records.map((r) => this.toModel(r));
  }

  async updateStatus(id: number, status: ChallengeStatus): Promise<Challenge> {
    const record = await this.prisma.challenge.update({
      where: { id },
      data: { status },
    });
    return this.toModel(record);
  }

  async markCompleted(id: number, completedAt: Date): Promise<Challenge> {
    const record = await this.prisma.challenge.update({
      where: { id },
      data: { status: ChallengeStatus.COMPLETED, completedAt },
    });
    return this.toModel(record);
  }

  async markForfeited(id: number, forfeitedAt: Date): Promise<Challenge> {
    const record = await this.prisma.challenge.update({
      where: { id },
      data: { status: ChallengeStatus.FORFEITED, forfeitedAt },
    });
    return this.toModel(record);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.challenge.delete({ where: { id } });
  }

  async completeCountFor(oauthId: string): Promise<number> {
    return this.prisma.challenge.count({
      where: { recipientId: oauthId, status: ChallengeStatus.COMPLETED },
    });
  }

  async forfeitCountFor(oauthId: string): Promise<number> {
    return this.prisma.challenge.count({
      where: { recipientId: oauthId, status: ChallengeStatus.FORFEITED },
    });
  }

  private toModel(record: {
    id: number;
    groupId: number;
    challengerId: string;
    recipientId: string;
    type: Challenge['type'];
    status: ChallengeStatus;
    gameId: number;
    description: string | null;
    completedAt: Date | null;
    forfeitedAt: Date | null;
  }): Challenge {
    return Challenge.create(
      {
        groupId: record.groupId,
        challengerId: record.challengerId,
        recipientId: record.recipientId,
        type: record.type,
        status: record.status,
        gameId: record.gameId,
        description: record.description,
        completedAt: record.completedAt,
        forfeitedAt: record.forfeitedAt,
      },
      record.id,
    );
  }
}
