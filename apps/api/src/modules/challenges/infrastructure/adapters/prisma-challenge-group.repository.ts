import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
  ChallengeGroupRepositoryPort,
  ChallengeGroupWithMembers,
} from '../../domain/ports/challenge-group.repository.port';
import { ChallengeGroup } from '../../domain/models/challenge-group.model';
import { ChallengeGroupMember } from '../../domain/models/challenge-group-member.model';
import { ChallengeGroupMemberStatus } from '@prisma/client';

@Injectable()
export class PrismaChallengeGroupRepository
  implements ChallengeGroupRepositoryPort
{
  constructor(private readonly prisma: PrismaService) {}

  async save(group: ChallengeGroup): Promise<ChallengeGroup> {
    const saved = await this.prisma.challengeGroup.create({
      data: { name: group.name, ownerId: group.ownerId },
    });
    return ChallengeGroup.create(
      { name: saved.name, ownerId: saved.ownerId },
      saved.id,
    );
  }

  async findById(id: number): Promise<ChallengeGroupWithMembers | null> {
    const group = await this.prisma.challengeGroup.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!group) return null;
    return this.toWithMembers(group);
  }

  async findMineByOwner(ownerId: string): Promise<ChallengeGroupWithMembers[]> {
    const groups = await this.prisma.challengeGroup.findMany({
      where: { ownerId },
      include: { members: true },
      orderBy: { createdAt: 'desc' },
    });
    return groups.map((g) => this.toWithMembers(g));
  }

  async findMineByMember(
    oauthId: string,
  ): Promise<ChallengeGroupWithMembers[]> {
    const groups = await this.prisma.challengeGroup.findMany({
      where: { members: { some: { oauthId } } },
      include: { members: true },
      orderBy: { createdAt: 'desc' },
    });
    return groups.map((g) => this.toWithMembers(g));
  }

  async findMember(
    groupId: number,
    oauthId: string,
  ): Promise<ChallengeGroupMember | null> {
    const member = await this.prisma.challengeGroupMember.findUnique({
      where: { groupId_oauthId: { groupId, oauthId } },
    });
    return member ? this.toMember(member) : null;
  }

  async getActiveMembers(groupId: number): Promise<ChallengeGroupMember[]> {
    const members = await this.prisma.challengeGroupMember.findMany({
      where: { groupId, status: ChallengeGroupMemberStatus.ACTIVE },
    });
    return members.map((m) => this.toMember(m));
  }

  async saveMember(
    member: ChallengeGroupMember,
  ): Promise<ChallengeGroupMember> {
    const saved = await this.prisma.challengeGroupMember.upsert({
      where: {
        groupId_oauthId: { groupId: member.groupId, oauthId: member.oauthId },
      },
      update: { role: member.role, status: member.status },
      create: {
        groupId: member.groupId,
        oauthId: member.oauthId,
        role: member.role,
        status: member.status,
      },
    });
    return this.toMember(saved);
  }

  async acceptInvite(
    groupId: number,
    oauthId: string,
  ): Promise<ChallengeGroupMember> {
    const saved = await this.prisma.challengeGroupMember.update({
      where: { groupId_oauthId: { groupId, oauthId } },
      data: { status: ChallengeGroupMemberStatus.ACTIVE },
    });
    return this.toMember(saved);
  }

  async declineInvite(groupId: number, oauthId: string): Promise<boolean> {
    const result = await this.prisma.challengeGroupMember.delete({
      where: { groupId_oauthId: { groupId, oauthId } },
    });
    return result !== null;
  }

  async isInvitedFriend(
    inviterOauthId: string,
    invitedOauthId: string,
  ): Promise<boolean> {
    const entry = await this.prisma.friendsListForFriends.findFirst({
      where: {
        friendsList: { ownerId: invitedOauthId },
        friend: { oauthId: inviterOauthId },
      },
    });
    return entry !== null;
  }

  private toWithMembers(group: {
    id: number;
    name: string;
    ownerId: string;
    members: Array<{
      groupId: number;
      oauthId: string;
      role: ChallengeGroupMember['role'];
      status: ChallengeGroupMemberStatus;
    }>;
  }): ChallengeGroupWithMembers {
    const model = ChallengeGroup.create(
      { name: group.name, ownerId: group.ownerId },
      group.id,
    );
    return Object.assign(model, {
      members: group.members.map((m) => this.toMember(m)),
    });
  }

  private toMember(member: {
    groupId: number;
    oauthId: string;
    role: ChallengeGroupMember['role'];
    status: ChallengeGroupMemberStatus;
  }): ChallengeGroupMember {
    return ChallengeGroupMember.create({
      groupId: member.groupId,
      oauthId: member.oauthId,
      role: member.role,
      status: member.status,
    });
  }
}
