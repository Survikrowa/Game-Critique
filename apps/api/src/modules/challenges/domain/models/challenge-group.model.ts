import { AggregateRoot } from '../../../../libs/ddd/aggregate-root.base';

export interface ChallengeGroupProps {
  name: string;
  ownerId: string;
}

export class ChallengeGroup extends AggregateRoot<ChallengeGroupProps> {
  get name(): string {
    return this.props.name;
  }

  get ownerId(): string {
    return this.props.ownerId;
  }

  static create(props: ChallengeGroupProps, id?: number): ChallengeGroup {
    return new ChallengeGroup(props, id);
  }
}
