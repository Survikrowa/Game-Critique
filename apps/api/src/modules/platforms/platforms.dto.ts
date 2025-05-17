import { Field, ObjectType } from '@nestjs/graphql';

//DONT USE - THIS IS BIND TO THE OLD API
@ObjectType({ description: 'Single Platform' })
export class PlatformDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
}

@ObjectType({ description: 'Platform' })
class Platform {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => String, { nullable: true })
  displayName?: string | null;
}

@ObjectType({ description: 'All Platforms' })
export class PlatformsDTO {
  @Field(() => [Platform])
  platforms: Platform[];
}

@ObjectType({ description: 'Update Platform display name return' })
export class UpdatePlatformDisplayNameDTO {
  @Field(() => Platform)
  platform: Platform;
}
