import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Role' })
export class RoleDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
}

@ObjectType({ description: 'Update user role' })
export class UpdateUserRoleDTO {
  @Field(() => Boolean)
  success: boolean;
}

@InputType()
export class UpdateUserRoleInput {
  @Field(() => Number)
  roleId: number;
  @Field(() => String)
  userOauthId: string;
}
