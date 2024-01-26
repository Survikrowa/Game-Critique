import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User profile info' })
export class ProfileInfoDTO {
  @Field(() => String)
  name: string;

  @Field(() => String, { description: "User's avatar URL from Cloudinary" })
  avatarUrl: string;
}
