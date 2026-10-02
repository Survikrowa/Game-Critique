import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AcceptGroupInviteCommand } from './accept_group_invite.command';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';
import { ChallengeGroupMemberStatus } from '@prisma/client';

@CommandHandler(AcceptGroupInviteCommand)
export class AcceptGroupInviteCommandHandler
  implements ICommandHandler<AcceptGroupInviteCommand>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
  ) {}

  async execute(command: AcceptGroupInviteCommand) {
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
    return this.groupRepository.acceptInvite(command.groupId, command.oauthId);
  }
}
