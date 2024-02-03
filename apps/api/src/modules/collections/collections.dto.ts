import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Single Collection' })
export class CollectionDTO {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Field(() => Number)
  counter: number;
}

@InputType({ description: 'New Collection' })
export class NewCollectionDTO {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
}

@InputType({ description: 'Required arguments to remove a collection' })
export class RemoveCollectionArgsDTO {
  @Field(() => Number)
  collectionId: number;
}

@ObjectType({ description: 'Collection removed' })
export class RemovedCollectionResponseDTO {
  @Field(() => Boolean)
  success: boolean;
}

export type NewCollectionRequiredFields = {
  name: string;
  description: string;
  profileId: number;
};
