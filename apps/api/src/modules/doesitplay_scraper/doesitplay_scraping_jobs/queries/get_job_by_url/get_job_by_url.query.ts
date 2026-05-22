import { Query } from '@nestjs/cqrs';

export class GetJobByUrlQuery extends Query<GetJobByUrlQueryResponse | null> {
  constructor(public readonly url: string) {
    super();
  }
}

type GetJobByUrlQueryResponse = {
  id: number;
  url: string;
  jobId: string;
  status: string;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
};
