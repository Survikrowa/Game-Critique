import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Single Platform' })
export class GenresDto {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
}
