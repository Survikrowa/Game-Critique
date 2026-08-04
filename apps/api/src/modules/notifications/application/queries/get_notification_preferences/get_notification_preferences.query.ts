import { IQuery } from '@nestjs/cqrs';

export class GetNotificationPreferencesQuery implements IQuery {
  constructor(public readonly oauthId: string) {}
}
