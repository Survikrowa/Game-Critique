import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserVerification {
  @Field()
  authorized: boolean;
}
