import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Role' })
export class RoleDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
}
