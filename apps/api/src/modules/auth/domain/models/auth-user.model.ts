import { AggregateRoot } from '../../../../libs/ddd/aggregate-root.base';
import { RoleEnum } from '@prisma/client';

export interface AuthUserProps {
  oauthId: string;
  role: RoleEnum;
}

export class AuthUser extends AggregateRoot<AuthUserProps> {
  get oauthId(): string {
    return this.props.oauthId;
  }

  get role(): RoleEnum {
    return this.props.role;
  }

  static create(props: AuthUserProps): AuthUser {
    return new AuthUser(props);
  }
}

export { RoleEnum as UserRole };
