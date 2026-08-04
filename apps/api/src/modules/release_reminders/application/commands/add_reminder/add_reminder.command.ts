import { AddReminderInput } from '../../../infrastructure/graphql/release_reminders.dto';

export class AddReminderCommand {
  constructor(
    public readonly oauthId: string,
    public readonly input: AddReminderInput,
  ) {}
}
