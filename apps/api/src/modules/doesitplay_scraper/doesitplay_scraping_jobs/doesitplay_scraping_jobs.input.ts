import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScrapingJobInput {
  @Field()
  url: string;
}
