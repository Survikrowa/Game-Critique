import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Single Platform' })
export class PlatformDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
}
