import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GameStatusChangedEvent } from '../../../notifications/application/events/game_status_changed.event';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepositoryPort,
} from '../../domain/ports/challenge.repository.port';
import { ChallengeType } from '@prisma/client';

@EventsHandler(GameStatusChangedEvent)
export class GameStatusChangedChallengeHandler
  implements IEventHandler<GameStatusChangedEvent>
{
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepositoryPort,
  ) {}

  async handle(event: GameStatusChangedEvent): Promise<void> {
    if (event.status !== 'COMPLETED') return;

    const challenges = await this.challengeRepository.findActiveForRecipient(
      event.oauthId,
      event.hltbId,
    );
    const beatGameChallenges = challenges.filter(
      (challenge) => challenge.type === ChallengeType.BEAT_GAME,
    );
    await Promise.all(
      beatGameChallenges.map((challenge) =>
        this.challengeRepository.markCompleted(challenge.id, new Date()),
      ),
    );
  }
}
