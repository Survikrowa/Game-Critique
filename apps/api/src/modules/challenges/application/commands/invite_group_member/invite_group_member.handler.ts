import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InviteGroupMemberCommand } from './invite_group_member.command';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';
import { ChallengeGroupMember } from '../../../domain/models/challenge-group-member.model';
import {
  ChallengeGroupMemberRole,
  ChallengeGroupMemberStatus,
} from '@prisma/client';

@CommandHandler(InviteGroupMemberCommand)
export class InviteGroupMemberCommandHandler
  implements ICommandHandler<InviteGroupMemberCommand>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
  ) {}

  async execute(command: InviteGroupMemberCommand) {
    const inviterMember = await this.groupRepository.findMember(
      command.groupId,
      command.inviterOauthId,
    );
    if (
      !inviterMember ||
      inviterMember.status !== ChallengeGroupMemberStatus.ACTIVE
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Musisz być aktywnym członkiem grupy, aby zapraszać',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const isFriend = await this.groupRepository.isInvitedFriend(
      command.inviterOauthId,
      command.invitedOauthId,
    );
    if (!isFriend) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Możesz zapraszać tylko swoich znajomych',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const existing = await this.groupRepository.findMember(
      command.groupId,
      command.invitedOauthId,
    );
    if (existing && existing.status === ChallengeGroupMemberStatus.ACTIVE) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Ta osoba jest już aktywna w grupie',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.groupRepository.saveMember(
      ChallengeGroupMember.create({
        groupId: command.groupId,
        oauthId: command.invitedOauthId,
        role: ChallengeGroupMemberRole.MEMBER,
        status: ChallengeGroupMemberStatus.INVITED,
      }),
    );
  }
}
