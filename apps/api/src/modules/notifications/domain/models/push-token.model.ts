import { AggregateRoot } from '../../../../libs/ddd/aggregate-root.base';

export interface PushTokenProps {
  oauthId: string;
  token: string;
  platform: string;
}

export class PushToken extends AggregateRoot<PushTokenProps> {
  get oauthId(): string {
    return this.props.oauthId;
  }
  get token(): string {
    return this.props.token;
  }
  get platform(): string {
    return this.props.platform;
  }

  static create(props: PushTokenProps): PushToken {
    return new PushToken(props);
  }
}
