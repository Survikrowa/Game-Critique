import { Query } from '@nestjs/cqrs';

export class GetJobByJobIdQuery extends Query<GetJobByJobIdQueryResponse | null> {
  constructor(public readonly jobId: string) {
    super();
  }
}

type GetJobByJobIdQueryResponse = {
  id: number;
  url: string;
  jobId: string;
  status: string;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
};
