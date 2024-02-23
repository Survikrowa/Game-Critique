import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MigrationStatus } from '@prisma/client';

registerEnumType(MigrationStatus, {
  name: 'MigrationStatus',
  description: "The status of the migration of a user's HowLongToBeat account",
});

@ObjectType()
export class HowLongToBeatMigrationStatusDTO {
  @Field(() => MigrationStatus, { nullable: true })
  status: MigrationStatus | null;
}
