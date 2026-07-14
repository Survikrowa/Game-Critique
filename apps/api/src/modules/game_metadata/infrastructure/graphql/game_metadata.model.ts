import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhysicalMediaEntryDTO {
  @Field({ nullable: true })
  platform: string | null;
  @Field()
  hasPhysicalRelease: boolean;
  @Field()
  hasGameOnDisc: boolean;
}

@ObjectType()
export class GameMetadataDTO {
  @Field(() => [PhysicalMediaEntryDTO], { nullable: true })
  physicalMedia: PhysicalMediaEntryDTO[] | null;
}
