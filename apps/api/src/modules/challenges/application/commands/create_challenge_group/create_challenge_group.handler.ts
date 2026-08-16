import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateChallengeGroupCommand } from './create_challenge_group.command';
import {
  CHALLENGE_GROUP_REPOSITORY,
  ChallengeGroupRepositoryPort,
} from '../../../domain/ports/challenge-group.repository.port';
import { ChallengeGroup } from '../../../domain/models/challenge-group.model';
import { ChallengeGroupMember } from '../../../domain/models/challenge-group-member.model';
import {
  ChallengeGroupMemberRole,
  ChallengeGroupMemberStatus,
} from '@prisma/client';

@CommandHandler(CreateChallengeGroupCommand)
export class CreateChallengeGroupCommandHandler
  implements ICommandHandler<CreateChallengeGroupCommand>
{
  constructor(
    @Inject(CHALLENGE_GROUP_REPOSITORY)
    private readonly groupRepository: ChallengeGroupRepositoryPort,
  ) {}

  async execute(command: CreateChallengeGroupCommand) {
    const group = await this.groupRepository.saveGroupWithOwner(
      ChallengeGroup.create({ name: command.name, ownerId: command.ownerId }),
      ChallengeGroupMember.create({
        groupId: 0,
        oauthId: command.ownerId,
        role: ChallengeGroupMemberRole.OWNER,
        status: ChallengeGroupMemberStatus.ACTIVE,
      }),
    );

    const saved = await this.groupRepository.findById(group.id);
    return saved;
  }
}
