import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationDTO {
  @Field(() => Number)
  total: number;

  @Field(() => Boolean)
  hasMore: boolean;
  @Field(() => Boolean)
  hasPrevious: boolean;

  @Field(() => Number)
  skip: number;
  @Field(() => Number)
  take: number;
}
