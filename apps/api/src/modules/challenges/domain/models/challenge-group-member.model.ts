import { AggregateRoot } from '../../../../libs/ddd/aggregate-root.base';
import {
  ChallengeGroupMemberRole,
  ChallengeGroupMemberStatus,
} from '@prisma/client';

export interface ChallengeGroupMemberProps {
  groupId: number;
  oauthId: string;
  role: ChallengeGroupMemberRole;
  status: ChallengeGroupMemberStatus;
}

export class ChallengeGroupMember extends AggregateRoot<ChallengeGroupMemberProps> {
  get groupId(): number {
    return this.props.groupId;
  }

  get oauthId(): string {
    return this.props.oauthId;
  }

  get role(): ChallengeGroupMemberRole {
    return this.props.role;
  }

  get status(): ChallengeGroupMemberStatus {
    return this.props.status;
  }

  static create(
    props: ChallengeGroupMemberProps,
    id?: number,
  ): ChallengeGroupMember {
    return new ChallengeGroupMember(props, id);
  }
}
