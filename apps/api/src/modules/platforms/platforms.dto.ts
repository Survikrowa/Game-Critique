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
}

@ObjectType({ description: 'All Platforms' })
export class PlatformsDTO {
  @Field(() => [PlatformDTO])
  platforms: Platform[];
}
