import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoleEnum } from '@prisma/client';

registerEnumType(RoleEnum, {
  name: 'Roles',
  description: 'All possible roles',
});
@ObjectType()
export class AuthUserVerification {
  @Field()
  authorized: boolean;
  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum;
}
