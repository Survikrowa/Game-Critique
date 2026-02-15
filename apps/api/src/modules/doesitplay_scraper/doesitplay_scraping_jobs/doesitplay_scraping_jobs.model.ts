import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { DoesItPlayJobStatus } from '@prisma/client';

registerEnumType(DoesItPlayJobStatus, {
  name: 'DoesItPlayJobStatus',
});

@ObjectType()
export class DoesItPlayScrapingJob {
  @Field()
  id: number;

  @Field()
  url: string;

  @Field()
  jobId: string;

  @Field()
  title: string;

  @Field()
  platform: string;

  @Field(() => DoesItPlayJobStatus)
  status: DoesItPlayJobStatus;

  @Field({ nullable: true })
  error?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class CreateScrapingJobResponse {
  @Field()
  success: boolean;

  @Field(() => DoesItPlayScrapingJob)
  job: DoesItPlayScrapingJob;
}
