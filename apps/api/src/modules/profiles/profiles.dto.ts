import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User profile info' })
export class ProfileInfoDTO {
  @Field(() => String)
  name: string;

  @Field(() => String, { description: "User's avatar URL from Cloudinary" })
  avatarUrl: string;

  @Field(() => Number)
  id: number;
}

@InputType({ description: 'User profile info required to update profile' })
export class ProfileInfoUpdateArgsDTO {
  @Field(() => String)
  name: string;

  @Field(() => String, { description: "User's avatar URL from Cloudinary" })
  avatarUrl: string;
}

@ObjectType({ description: 'Response for updating profile info' })
export class ProfileInfoUpdateResponseDTO {
  @Field(() => Boolean)
  success: boolean;
}
