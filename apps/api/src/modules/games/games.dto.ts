import { Field, ObjectType } from '@nestjs/graphql';
import { CoverDTO } from '../covers/covers.dto';

@ObjectType({ description: 'Single Game' })
export class GameDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => String)
  hltbId: string;
}

@ObjectType({ description: 'Single Game with covers' })
export class GameWithCoversDTO {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
  @Field(() => String)
  hltbId: string;
  @Field(() => [CoverDTO])
  covers: CoverDTO[];
}
