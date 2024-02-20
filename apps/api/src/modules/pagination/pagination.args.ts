import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Number, { nullable: true, defaultValue: 0 })
  skip?: number;
  @Field(() => Number, { nullable: true, defaultValue: 5 })
  take?: number;
}
