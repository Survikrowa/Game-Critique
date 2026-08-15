import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DeclineGroupInviteCommand } from './decline_group_invite.command';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';
import { ChallengeGroupMemberStatus } from '@prisma/client';

@CommandHandler(DeclineGroupInviteCommand)
export class DeclineGroupInviteCommandHandler
  implements ICommandHandler<DeclineGroupInviteCommand>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
  ) {}

  async execute(command: DeclineGroupInviteCommand) {
    const existing = await this.groupRepository.findMember(
      command.groupId,
      command.oauthId,
    );
    if (!existing || existing.status !== ChallengeGroupMemberStatus.INVITED) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Zaproszenie nie istnieje' },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.groupRepository.declineInvite(command.groupId, command.oauthId);
    return true;
  }
}
