import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class NotificationPreferencesObject {
  @Field()
  friendActivity: boolean;
  @Field()
  friendInvites: boolean;
  @Field()
  weeklySummary: boolean;
  @Field()
  releaseReminders: boolean;
}

@InputType()
export class NotificationPreferencesInput {
  @Field({ nullable: true })
  friendActivity?: boolean;
  @Field({ nullable: true })
  friendInvites?: boolean;
  @Field({ nullable: true })
  weeklySummary?: boolean;
  @Field({ nullable: true })
  releaseReminders?: boolean;
}
