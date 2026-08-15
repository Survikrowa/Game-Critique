import { AggregateRoot } from '../../../../libs/ddd/aggregate-root.base';
import { ChallengeStatus, ChallengeType } from '@prisma/client';

export interface ChallengeProps {
  groupId: number;
  challengerId: string;
  recipientId: string;
  type: ChallengeType;
  status: ChallengeStatus;
  gameId: number;
  description: string | null;
  completedAt: Date | null;
  forfeitedAt: Date | null;
}

export class Challenge extends AggregateRoot<ChallengeProps> {
  get groupId(): number {
    return this.props.groupId;
  }

  get challengerId(): string {
    return this.props.challengerId;
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  get type(): ChallengeType {
    return this.props.type;
  }

  get status(): ChallengeStatus {
    return this.props.status;
  }

  get gameId(): number {
    return this.props.gameId;
  }

  get description(): string | null {
    return this.props.description;
  }

  static create(props: ChallengeProps, id?: number): Challenge {
    return new Challenge(props, id);
  }
}
