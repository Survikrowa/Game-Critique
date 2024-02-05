import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Single Cover' })
export class CoverDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  smallUrl: string;
  @Field(() => String)
  mediumUrl: string;
  @Field(() => String)
  bigUrl: string;
}
