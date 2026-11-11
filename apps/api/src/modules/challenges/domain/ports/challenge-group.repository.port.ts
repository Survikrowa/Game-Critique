import { RepositoryPort } from '../../../../libs/ddd/repository.port';
import { ChallengeGroup } from '../models/challenge-group.model';
import { ChallengeGroupMember } from '../models/challenge-group-member.model';

export const CHALLENGE_GROUP_REPOSITORY = Symbol('CHALLENGE_GROUP_REPOSITORY');

export type ChallengeGroupWithMembers = ChallengeGroup & {
  members: ChallengeGroupMember[];
};

export interface ChallengeGroupRepositoryPort
  extends RepositoryPort<ChallengeGroup> {
  findById(id: number): Promise<ChallengeGroupWithMembers | null>;
  findMineByOwner(ownerId: string): Promise<ChallengeGroupWithMembers[]>;
  findMineByMember(oauthId: string): Promise<ChallengeGroupWithMembers[]>;
  saveGroupWithOwner(
    group: ChallengeGroup,
    member: ChallengeGroupMember,
  ): Promise<ChallengeGroup>;
  findMember(
    groupId: number,
    oauthId: string,
  ): Promise<ChallengeGroupMember | null>;
  getActiveMembers(groupId: number): Promise<ChallengeGroupMember[]>;
  saveMember(member: ChallengeGroupMember): Promise<ChallengeGroupMember>;
  acceptInvite(groupId: number, oauthId: string): Promise<ChallengeGroupMember>;
  declineInvite(groupId: number, oauthId: string): Promise<boolean>;
  isInvitedFriend(
    inviterOauthId: string,
    invitedOauthId: string,
  ): Promise<boolean>;
}
